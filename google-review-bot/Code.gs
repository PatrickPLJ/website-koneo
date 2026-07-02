/**
 * Bot Auto-Reply Google Maps Review — Koneo Indonesia
 * ====================================================
 * Semi-otomatis: bot generate draft balasan, admin approve/edit sebelum
 * benar-benar terpost ke Google Maps. Tidak ada yang terpost tanpa klik
 * manusia.
 *
 * Alur:
 *   Trigger tiap 1 jam -> checkNewReviews()
 *   -> ambil review baru dari Google Business Profile API
 *   -> generate draft balasan pakai Anthropic API (Claude)
 *   -> log ke Google Sheet "Review Log"
 *   -> notifikasi admin (WhatsApp via Fonnte, atau Gmail)
 *   -> admin klik link -> buka halaman approval (doGet)
 *   -> admin klik Approve atau Edit lalu submit (doPost)
 *   -> balasan terpost ke Google Maps
 *
 * Lihat SETUP.md untuk instruksi konfigurasi lengkap.
 */

// ── Konstanta ──────────────────────────────────────────────────────────────

const SHEET_NAME = 'Review Log';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_VERSION = '2023-06-01';
const CLAUDE_MODEL = 'claude-sonnet-4-6';
const CLAUDE_MAX_TOKENS = 300;

const GMB_API_BASE = 'https://mybusiness.googleapis.com/v4';
const FONNTE_API_URL = 'https://api.fonnte.com/send';

const HEADERS = [
  'Timestamp_Masuk',
  'Review_ID', // wajib untuk dedupe — lihat catatan di SETUP.md
  'Nama_Reviewer',
  'Rating',
  'Isi_Review',
  'Draft_Balasan',
  'Status', // Pending / Approved / Edited / Posted / Error - Perlu Balas Manual
  'Timestamp_Dipost',
  'Catatan_Admin',
];

const HEADER_TO_FIELD = {
  Timestamp_Masuk: 'timestampMasuk',
  Review_ID: 'reviewId',
  Nama_Reviewer: 'reviewerName',
  Rating: 'rating',
  Isi_Review: 'reviewText',
  Draft_Balasan: 'draftReply',
  Status: 'status',
  Timestamp_Dipost: 'timestampDipost',
  Catatan_Admin: 'catatanAdmin',
};

// ── Entry point utama (dipanggil oleh trigger tiap 1 jam) ───────────────────

function checkNewReviews() {
  const config = getConfig_();
  assertConfig_(config);

  const sheet = getSheet_(config);
  const existingIds = getExistingReviewIds_(sheet);

  let reviews;
  try {
    reviews = fetchGoogleReviews_(config);
  } catch (err) {
    Logger.log('Gagal mengambil daftar review dari Google Business Profile: ' + err);
    return;
  }

  reviews.forEach(function (review) {
    // Rate limit aman: satu review hanya diproses sekali, tidak polling ulang.
    if (existingIds.indexOf(review.reviewId) !== -1) return;

    const rating = starRatingToNumber_(review.starRating);
    const reviewerName = (review.reviewer && review.reviewer.displayName) || 'Pelanggan';
    const reviewText = review.comment || '';

    let draftReply = '';
    let status;
    try {
      draftReply = generateDraftReply_(config, rating, reviewText);
      status = 'Pending';
    } catch (err) {
      // Anthropic API gagal/timeout -> jangan crash, log error & tetap
      // notifikasi admin supaya review ini dibalas manual.
      Logger.log('Gagal generate draft untuk review ' + review.reviewId + ': ' + err);
      status = 'Error - Perlu Balas Manual';
    }

    const row = appendReviewRow_(sheet, {
      reviewId: review.reviewId,
      reviewerName: reviewerName,
      rating: rating,
      reviewText: reviewText,
      draftReply: draftReply,
      status: status,
    });

    try {
      notifyAdmin_(config, {
        row: row,
        reviewId: review.reviewId,
        reviewerName: reviewerName,
        rating: rating,
        reviewText: reviewText,
        draftReply: draftReply,
        status: status,
      });
    } catch (err) {
      Logger.log('Gagal kirim notifikasi untuk baris ' + row + ': ' + err);
    }
  });
}

// ── Google Business Profile API ─────────────────────────────────────────────

function fetchGoogleReviews_(config) {
  const url = GMB_API_BASE + '/accounts/' + config.gmbAccountId +
    '/locations/' + config.gmbLocationId + '/reviews?pageSize=50';

  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error('Google Business Profile API error ' + code + ': ' + response.getContentText());
  }

  const data = JSON.parse(response.getContentText());
  return data.reviews || [];
}

function postReplyToGoogle_(config, reviewId, replyText) {
  const url = GMB_API_BASE + '/accounts/' + config.gmbAccountId +
    '/locations/' + config.gmbLocationId + '/reviews/' + reviewId + '/reply';

  const response = UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    payload: JSON.stringify({ comment: replyText }),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    throw new Error('Google Business Profile reply API error ' + code + ': ' + response.getContentText());
  }
}

function starRatingToNumber_(starRating) {
  const map = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
  return map[starRating] || 0;
}

// ── Anthropic API (Claude) ───────────────────────────────────────────────────

function generateDraftReply_(config, rating, reviewText) {
  // Handling review tanpa teks (hanya bintang) — tetap generate balasan
  // singkat yang sesuai rating.
  const isiReview = reviewText && reviewText.trim().length > 0
    ? reviewText.trim()
    : '(Pelanggan tidak menulis komentar apapun, hanya memberi rating bintang.)';

  const payload = {
    model: CLAUDE_MODEL,
    max_tokens: CLAUDE_MAX_TOKENS,
    messages: [
      { role: 'user', content: buildPrompt_(rating, isiReview) },
    ],
  };

  // Semua panggilan API pakai UrlFetchApp (server-side Apps Script),
  // bukan fetch() — CORS tidak relevan di sini.
  const response = UrlFetchApp.fetch(CLAUDE_API_URL, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': config.anthropicApiKey,
      'anthropic-version': CLAUDE_API_VERSION,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  const body = response.getContentText();

  if (code !== 200) {
    throw new Error('Anthropic API error ' + code + ': ' + body);
  }

  const data = JSON.parse(body);
  const textBlock = (data.content || []).filter(function (b) { return b.type === 'text'; })[0];
  if (!textBlock || !textBlock.text) {
    throw new Error('Respons Anthropic API tidak berisi teks balasan.');
  }
  return textBlock.text.trim();
}

// Prompt instruksi — wajib diikuti persis sesuai brief, jangan diubah.
function buildPrompt_(rating, isiReview) {
  return [
    'Kamu adalah admin Koneo Indonesia, sebuah Korean bingsoo bar',
    'di Denpasar, Bali. Balas review pelanggan di Google Maps dengan',
    'tone hangat dan personal — seperti teman yang merespon, bukan',
    'customer service korporat.',
    '',
    'Aturan wajib:',
    '- JANGAN pernah menyebut "es serut" dalam bentuk apapun —',
    '  selalu sebut produk langsung sebagai "bingsoo"',
    '- Jangan pernah copy-paste template yang sama persis —',
    '  setiap balasan harus terasa unik dan kontekstual',
    '- Untuk review positif: ucapkan terima kasih yang spesifik',
    '  (sebut detail yang mereka tulis), ajak balik lagi',
    '- Untuk review negatif: akui masalah, minta maaf tanpa',
    '  defensif, tawarkan untuk dihubungi langsung, jangan janji',
    '  yang tidak bisa ditepati',
    '- Untuk review netral: hangat, tanya apa yang bisa',
    '  diperbaiki, tidak perlu panjang',
    '- Panjang balasan: 2-4 kalimat, tidak lebih',
    '- Bahasa: Indonesia informal (tidak baku), tapi tetap sopan',
    '',
    'Review yang perlu dibalas:',
    'Rating: ' + rating + '/5',
    'Isi review: ' + isiReview,
    '',
    'Balas sekarang:',
  ].join('\n');
}

// ── Google Sheet "Review Log" ────────────────────────────────────────────────

function getSheet_(config) {
  const ss = config.spreadsheetId
    ? SpreadsheetApp.openById(config.spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || createReviewLogSheet(ss);
}

/**
 * Jalankan sekali dari editor Apps Script untuk membuat sheet "Review Log"
 * dengan header yang benar. Sheet juga otomatis dibuat saat checkNewReviews()
 * berjalan pertama kali kalau belum ada.
 */
function createReviewLogSheet(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(SHEET_NAME);
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, HEADERS.length);
  return sheet;
}

function getExistingReviewIds_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const idCol = HEADERS.indexOf('Review_ID') + 1;
  return sheet.getRange(2, idCol, lastRow - 1, 1).getValues().map(function (r) { return r[0]; });
}

function appendReviewRow_(sheet, data) {
  sheet.appendRow([
    new Date(),
    data.reviewId,
    data.reviewerName,
    data.rating,
    data.reviewText,
    data.draftReply,
    data.status,
    '', // Timestamp_Dipost — diisi saat admin approve/edit
    '', // Catatan_Admin — isian manual opsional
  ]);
  return sheet.getLastRow();
}

function getRowData_(sheet, row) {
  const lastRow = sheet.getLastRow();
  if (row < 2 || row > lastRow) return null;
  const values = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  const obj = {};
  HEADERS.forEach(function (header, i) {
    obj[HEADER_TO_FIELD[header]] = values[i];
  });
  return obj;
}

function updateRowAfterPost_(sheet, row, status, finalReply) {
  sheet.getRange(row, HEADERS.indexOf('Draft_Balasan') + 1).setValue(finalReply);
  sheet.getRange(row, HEADERS.indexOf('Status') + 1).setValue(status);
  sheet.getRange(row, HEADERS.indexOf('Timestamp_Dipost') + 1).setValue(new Date());
}

// ── Notifikasi admin (WhatsApp via Fonnte, atau Gmail) ───────────────────────

function notifyAdmin_(config, info) {
  const link = buildApprovalLink_(config, info.row, info.reviewId);

  if (config.notificationMethod === 'whatsapp') {
    sendWhatsAppNotification_(config, buildNotificationText_(info, link));
  } else {
    sendEmailNotification_(config, info, link);
  }
}

function buildApprovalLink_(config, row, reviewId) {
  const token = generateActionToken_(config, row, reviewId);
  return config.webAppUrl + '?row=' + row + '&token=' + encodeURIComponent(token);
}

function starsText_(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function buildNotificationText_(info, link) {
  if (String(info.status).indexOf('Error') === 0) {
    return [
      'Review baru masuk tapi draft balasan GAGAL dibuat otomatis.',
      'Nama: ' + info.reviewerName,
      'Rating: ' + starsText_(info.rating) + ' (' + info.rating + '/5)',
      'Isi review: ' + (info.reviewText || '(tanpa komentar)'),
      '',
      'Mohon balas manual di Google Maps, atau buka link berikut untuk isi draft sendiri:',
      link,
    ].join('\n');
  }

  return [
    'Review baru di Google Maps Koneo:',
    'Nama: ' + info.reviewerName,
    'Rating: ' + starsText_(info.rating) + ' (' + info.rating + '/5)',
    'Isi review: ' + (info.reviewText || '(tanpa komentar)'),
    '',
    'Draft balasan (dari Claude):',
    info.draftReply,
    '',
    'Buka untuk approve / edit sebelum diposting:',
    link,
  ].join('\n');
}

function sendWhatsAppNotification_(config, message) {
  const response = UrlFetchApp.fetch(FONNTE_API_URL, {
    method: 'post',
    headers: { Authorization: config.fonnteApiKey },
    payload: {
      target: config.adminWhatsappNumber,
      message: message,
    },
    muteHttpExceptions: true,
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    Logger.log('Fonnte API error ' + code + ': ' + response.getContentText());
  }
}

function sendEmailNotification_(config, info, link) {
  const isError = String(info.status).indexOf('Error') === 0;
  const subject = isError
    ? '[Koneo] Review baru (' + info.rating + '/5) - draft GAGAL dibuat, perlu balas manual'
    : '[Koneo] Review baru (' + info.rating + '/5) dari ' + info.reviewerName + ' - perlu approve balasan';

  GmailApp.sendEmail(config.adminEmail, subject, buildNotificationText_(info, link), {
    htmlBody: buildNotificationHtml_(info, link),
  });
}

function buildNotificationHtml_(info, link) {
  const draftHtml = info.draftReply
    ? '<p style="white-space:pre-wrap;background:#f6f2ec;padding:12px;border-radius:8px;">' + escapeHtml_(info.draftReply) + '</p>'
    : '<p><em>Draft gagal dibuat otomatis — mohon balas manual di Google Maps.</em></p>';

  return [
    '<div style="font-family:sans-serif;max-width:480px;">',
    '<h2>Review baru Google Maps — Koneo Indonesia</h2>',
    '<p><strong>' + escapeHtml_(info.reviewerName) + '</strong> — ' + starsText_(info.rating) + ' (' + info.rating + '/5)</p>',
    '<p>' + escapeHtml_(info.reviewText || '(tanpa komentar)') + '</p>',
    '<h3>Draft balasan:</h3>',
    draftHtml,
    '<p><a href="' + link + '" style="display:inline-block;background:#111;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">Buka untuk Approve / Edit</a></p>',
    '</div>',
  ].join('');
}

function escapeHtml_(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Token approval (mencegah link ditebak/dipakai orang lain) ───────────────

function generateActionToken_(config, row, reviewId) {
  const raw = row + '|' + reviewId + '|' + config.tokenSecret;
  const signatureBytes = Utilities.computeHmacSha256Signature(raw, config.tokenSecret);
  return Utilities.base64EncodeWebSafe(signatureBytes);
}

function verifyActionToken_(config, row, reviewId, token) {
  return generateActionToken_(config, row, reviewId) === token;
}

// ── Web App: halaman approval ────────────────────────────────────────────────

function doGet(e) {
  const config = getConfig_();
  const row = Number(e.parameter.row);
  const token = e.parameter.token;

  if (!row || !token) {
    return HtmlService.createHtmlOutput('<p>Link tidak valid.</p>');
  }

  const sheet = getSheet_(config);
  const rowData = getRowData_(sheet, row);
  if (!rowData) {
    return HtmlService.createHtmlOutput('<p>Data review tidak ditemukan.</p>');
  }
  if (!verifyActionToken_(config, row, rowData.reviewId, token)) {
    return HtmlService.createHtmlOutput('<p>Link tidak valid atau sudah kadaluarsa.</p>');
  }
  if (rowData.status === 'Approved' || rowData.status === 'Edited') {
    return HtmlService.createHtmlOutput('<div style="font-family:sans-serif;padding:24px;"><h2>Sudah diproses</h2><p>Balasan untuk review ini sudah diposting sebelumnya ke Google Maps.</p></div>');
  }

  const template = HtmlService.createTemplateFromFile('Approval');
  template.row = row;
  template.token = token;
  template.data = rowData;
  template.scriptUrl = ScriptApp.getService().getUrl();

  return template.evaluate()
    .setTitle('Approve Balasan Review - Koneo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  const config = getConfig_();
  const row = Number(e.parameter.row);
  const token = e.parameter.token;
  const action = e.parameter.action; // 'approve' atau 'edit'
  const finalReply = (e.parameter.finalReply || '').trim();

  const sheet = getSheet_(config);
  const rowData = getRowData_(sheet, row);

  if (!rowData || !verifyActionToken_(config, row, rowData.reviewId, token)) {
    return HtmlService.createHtmlOutput('<p>Link tidak valid.</p>');
  }
  if (rowData.status === 'Approved' || rowData.status === 'Edited') {
    return HtmlService.createHtmlOutput('<p>Balasan sudah diposting sebelumnya.</p>');
  }
  if (!finalReply) {
    return HtmlService.createHtmlOutput('<p>Draft balasan tidak boleh kosong.</p>');
  }

  try {
    postReplyToGoogle_(config, rowData.reviewId, finalReply);
  } catch (err) {
    return HtmlService.createHtmlOutput('<div style="font-family:sans-serif;padding:24px;"><h2>Gagal posting</h2><p>' + escapeHtml_(String(err)) + '</p></div>');
  }

  updateRowAfterPost_(sheet, row, action === 'edit' ? 'Edited' : 'Approved', finalReply);

  return HtmlService.createHtmlOutput(
    '<div style="font-family:sans-serif;padding:24px;text-align:center;">' +
    '<h2>Berhasil diposting</h2>' +
    '<p>Balasan sudah terpost ke Google Maps. Terima kasih!</p>' +
    '</div>'
  );
}

// ── Konfigurasi & setup ──────────────────────────────────────────────────────

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    anthropicApiKey: props.getProperty('ANTHROPIC_API_KEY'),
    gmbAccountId: props.getProperty('GMB_ACCOUNT_ID'),
    gmbLocationId: props.getProperty('GMB_LOCATION_ID'),
    notificationMethod: (props.getProperty('NOTIFICATION_METHOD') || 'email').toLowerCase(),
    fonnteApiKey: props.getProperty('FONNTE_API_KEY'),
    adminWhatsappNumber: props.getProperty('ADMIN_WHATSAPP_NUMBER'),
    adminEmail: props.getProperty('ADMIN_EMAIL'),
    webAppUrl: props.getProperty('WEB_APP_URL'),
    tokenSecret: props.getProperty('TOKEN_SECRET'),
    spreadsheetId: props.getProperty('SPREADSHEET_ID'),
  };
}

function assertConfig_(config) {
  const required = ['anthropicApiKey', 'gmbAccountId', 'gmbLocationId', 'webAppUrl', 'tokenSecret'];
  if (config.notificationMethod === 'whatsapp') {
    required.push('fonnteApiKey', 'adminWhatsappNumber');
  } else {
    required.push('adminEmail');
  }
  const missing = required.filter(function (key) { return !config[key]; });
  if (missing.length) {
    throw new Error('Script Properties belum lengkap: ' + missing.join(', ') + '. Lihat SETUP.md.');
  }
}

/**
 * Jalankan sekali dari editor Apps Script setelah deploy Web App, supaya
 * link approve/edit di notifikasi mengarah ke URL yang benar.
 */
function saveWebAppUrl(url) {
  if (!url) throw new Error('URL kosong.');
  PropertiesService.getScriptProperties().setProperty('WEB_APP_URL', url);
  Logger.log('WEB_APP_URL tersimpan: ' + url);
}

/**
 * Jalankan sekali dari editor Apps Script untuk memasang trigger otomatis
 * tiap 1 jam. Aman dipanggil ulang — trigger lama untuk fungsi yang sama
 * akan dihapus dulu supaya tidak dobel.
 */
function createHourlyTrigger() {
  deleteExistingTriggers_('checkNewReviews');
  ScriptApp.newTrigger('checkNewReviews')
    .timeBased()
    .everyHours(1)
    .create();
  Logger.log('Trigger tiap 1 jam untuk checkNewReviews() sudah aktif.');
}

function deleteExistingTriggers_(functionName) {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

// ── Fungsi testing manual (lihat TESTING.md) ─────────────────────────────────

function testGenerateDraftReplyPositif() {
  const config = getConfig_();
  Logger.log(generateDraftReply_(config, 5, 'Bingsoo mangganya enak banget, tempatnya juga estetik buat foto-foto!'));
}

function testGenerateDraftReplyNegatif() {
  const config = getConfig_();
  Logger.log(generateDraftReply_(config, 2, 'Pelayanan lama banget, nunggu 40 menit baru bingsoo datang.'));
}

function testGenerateDraftReplyTanpaTeks() {
  const config = getConfig_();
  Logger.log(generateDraftReply_(config, 4, ''));
}

function testFetchGoogleReviews() {
  const config = getConfig_();
  Logger.log(JSON.stringify(fetchGoogleReviews_(config), null, 2));
}

function testCreateSheet() {
  createReviewLogSheet();
}

/**
 * Bantuan setup: jalankan fungsi ini SEBELUM mengisi GMB_ACCOUNT_ID dan
 * GMB_LOCATION_ID di Script Properties. Hasilnya (Account ID dan Location
 * ID Koneo) akan muncul di Logger (View > Logs), tidak perlu cari manual
 * lewat URL Google Business Profile.
 *
 * Catatan: fungsi ini butuh 2 API tambahan yang aktif di Google Cloud
 * Console, di luar "Google My Business API" untuk membaca/membalas review:
 *   - "My Business Account Management API"
 *   - "My Business Business Information API"
 */
function listAccountsAndLocationsForSetup() {
  const token = ScriptApp.getOAuthToken();

  const accountsResponse = UrlFetchApp.fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    { headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true }
  );
  if (accountsResponse.getResponseCode() !== 200) {
    Logger.log('Gagal ambil daftar akun: ' + accountsResponse.getContentText());
    return;
  }

  const accounts = JSON.parse(accountsResponse.getContentText()).accounts || [];
  if (!accounts.length) {
    Logger.log('Tidak ada akun Business Profile yang ditemukan untuk akun Google ini.');
    return;
  }

  accounts.forEach(function (account) {
    // account.name formatnya "accounts/1234567890"
    const accountId = account.name.split('/')[1];
    Logger.log('=== Akun: ' + account.accountName + ' | GMB_ACCOUNT_ID = ' + accountId + ' ===');

    const locationsResponse = UrlFetchApp.fetch(
      'https://mybusinessbusinessinformation.googleapis.com/v1/' + account.name + '/locations?readMask=name,title',
      { headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true }
    );
    if (locationsResponse.getResponseCode() !== 200) {
      Logger.log('Gagal ambil daftar lokasi untuk akun ini: ' + locationsResponse.getContentText());
      return;
    }

    const locations = JSON.parse(locationsResponse.getContentText()).locations || [];
    locations.forEach(function (location) {
      // location.name formatnya "locations/1234567890"
      const locationId = location.name.split('/')[1];
      Logger.log('  -> Cabang: ' + location.title + ' | GMB_LOCATION_ID = ' + locationId);
    });
  });
}
