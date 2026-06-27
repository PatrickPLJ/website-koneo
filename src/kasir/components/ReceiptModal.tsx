import { formatRupiah } from '../store'
import type { Transaction } from '../types'

const METHOD_LABEL: Record<string, string> = { cash: 'Tunai', qris: 'QRIS', transfer: 'Transfer' }
const ORDER_LABEL: Record<string, string> = { dine_in: 'Dine In', takeaway: 'Takeaway' }

interface Props {
  transaction: Transaction
  onClose: () => void
  onNew?: () => void
}

export default function ReceiptModal({ transaction: t, onClose, onNew }: Props) {
  function handlePrint() {
    window.print()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: '#1a1d27', borderRadius: 16, width: '100%', maxWidth: 400,
        maxHeight: '90vh', overflow: 'auto', border: '1px solid #2a2d3a',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        {/* Receipt header */}
        <div style={{ textAlign: 'center', padding: '24px 24px 16px', borderBottom: '1px dashed #2a2d3a' }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🍧</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>KONEO Indonesia</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Bali, Indonesia</div>
          <div style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>koneo.id</div>
        </div>

        <div style={{ padding: '16px 24px', borderBottom: '1px dashed #2a2d3a' }}>
          <Row label="No. Struk" value={t.receiptNo} highlight />
          <Row label="Tanggal" value={new Date(t.date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} />
          <Row label="Kasir" value={t.cashier} />
          <Row label="Tipe Order" value={ORDER_LABEL[t.orderType]} />
          {t.tableNo && <Row label="Meja" value={t.tableNo} />}
        </div>

        {/* Items */}
        <div style={{ padding: '16px 24px', borderBottom: '1px dashed #2a2d3a' }}>
          {t.items.map((item, i) => {
            const price = item.variantPrice ?? item.product.price
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: '#fff' }}>
                    {item.product.name}{item.variantLabel ? ` (${item.variantLabel})` : ''}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{item.qty} x {formatRupiah(price)}</div>
                  {item.note && <div style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>* {item.note}</div>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{formatRupiah(price * item.qty)}</div>
              </div>
            )
          })}
        </div>

        {/* Totals */}
        <div style={{ padding: '16px 24px', borderBottom: '1px dashed #2a2d3a' }}>
          <Row label="Subtotal" value={formatRupiah(t.subtotal)} />
          {t.discount > 0 && <Row label="Diskon" value={`- ${formatRupiah(t.discount)}`} />}
          {t.tax > 0 && <Row label="Pajak (10%)" value={formatRupiah(t.tax)} />}
          <div style={{ height: 8 }} />
          <Row label="TOTAL" value={formatRupiah(t.total)} highlight big />
          <div style={{ height: 8 }} />
          <Row label="Pembayaran" value={METHOD_LABEL[t.paymentMethod]} />
          {t.paymentMethod === 'cash' && t.cashPaid != null && (
            <>
              <Row label="Bayar" value={formatRupiah(t.cashPaid)} />
              <Row label="Kembali" value={formatRupiah(t.cashChange ?? 0)} highlight />
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px 24px', color: '#6b7280', fontSize: 12 }}>
          Terima kasih telah berkunjung! 🙏<br />
          <span style={{ fontSize: 11 }}>Simpan struk ini sebagai bukti pembayaran</span>
        </div>

        {/* Actions */}
        <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10 }}>
          <button onClick={handlePrint} style={{ flex: 1, padding: '12px', borderRadius: 10, background: '#2a2d3a', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14 }}>
            🖨️ Print
          </button>
          {onNew && (
            <button onClick={onNew} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              Transaksi Baru
            </button>
          )}
          {!onNew && (
            <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 10, background: '#2a2d3a', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14 }}>
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight, big }: { label: string; value: string; highlight?: boolean; big?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: big ? 14 : 13, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: big ? 16 : 13, fontWeight: highlight || big ? 700 : 400, color: highlight ? '#f59e0b' : '#fff' }}>{value}</span>
    </div>
  )
}
