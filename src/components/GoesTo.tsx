import { useState, useEffect, useCallback } from 'react'
import { waLink } from '../config'
import { menuImgUrl } from '../utils/imgUrl'

const events = [
  {
    icon: '💍',
    title: 'Pernikahan',
    desc: 'Hadirkan bingsoo bar Korea di hari spesialmu. Setup booth estetik, crew ramah, dan menu bisa dikustomisasi sesuai tema wedding.',
    tags: ['Booth Setup', 'Custom Menu', 'Crew Terlatih'],
  },
  {
    icon: '🎂',
    title: 'Ulang Tahun',
    desc: 'Bikin surprise makin berkesan dengan Koneo hadir langsung. Cocok untuk sweet seventeen, kids party, hingga adult birthday.',
    tags: ['Kids Friendly', 'Live Serving', 'Dekorasi Booth'],
  },
  {
    icon: '🎪',
    title: 'Event & Pameran',
    desc: 'Koneo bisa hadir di bazaar, festival, corporate event, dan pameran. Stand menarik yang selalu jadi magnet pengunjung.',
    tags: ['Bazaar & Festival', 'Corporate Event', 'Crowd Pleaser'],
  },
  {
    icon: '🎓',
    title: 'Wisuda & Gathering',
    desc: 'Rayakan pencapaian bersama orang tersayang dengan sajian bingsoo segar. Cocok untuk acara keluarga, reuni, dan gathering kantor.',
    tags: ['Family Gathering', 'Reuni', 'Kantor & Kampus'],
  },
]

const pages = [
  '/pricelist/bingsoo-vanilla.jpg',
  '/pricelist/bingsoo-non-vanilla.jpg',
  '/pricelist/bingsoo-mix.jpg',
  '/pricelist/togo-dimsum-1.jpg',
  '/pricelist/togo-dimsum-2.jpg',
  '/pricelist/togo-gyoza-1.jpg',
  '/pricelist/togo-gyoza-2.jpg',
  '/pricelist/togo-mix-1.jpg',
  '/pricelist/togo-mix-2.jpg',
]

function BookViewer({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(pages.length - 1, c + 1)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  // touch swipe
  let touchX = 0
  const onTouchStart = (e: React.TouchEvent) => { touchX = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX - e.changedTouches[0].clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
  }

  return (
    <div className="book-overlay" onClick={onClose}>
      <div
        className="book-viewer"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Close */}
        <button className="book-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="book-header">
          <span className="book-title">Price List — Koneo Goes To</span>
          <span className="book-counter">{current + 1} / {pages.length}</span>
        </div>

        {/* Page image */}
        <div className="book-page">
          <img
            key={current}
            src={menuImgUrl(pages[current])}
            alt={`Halaman ${current + 1}`}
            className="book-img"
          />
        </div>

        {/* Navigation */}
        <div className="book-nav">
          <button className="book-btn" onClick={prev} disabled={current === 0}>
            ← Sebelumnya
          </button>
          {/* Dot indicators */}
          <div className="book-dots">
            {pages.map((_, i) => (
              <button
                key={i}
                className={`book-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Halaman ${i + 1}`}
              />
            ))}
          </div>
          <button className="book-btn" onClick={next} disabled={current === pages.length - 1}>
            Berikutnya →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GoesTo() {
  const [bookOpen, setBookOpen] = useState(false)

  return (
    <section id="goes-to" className="pad goes-to">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="goes-head reveal">
          <span className="eyebrow">Layanan Katering</span>
          <h2 className="display">Koneo <em>Goes To</em></h2>
          <p>
            Kami hadir langsung di acaramu — membawa booth bingsoo Korea yang estetik,
            segar, dan berkesan untuk setiap tamu undangan.
          </p>
        </div>

        <div className="goes-grid">
          {events.map((ev) => (
            <div className="goes-card reveal" key={ev.title}>
              <div className="goes-icon">{ev.icon}</div>
              <h3>{ev.title}</h3>
              <p>{ev.desc}</p>
              <div className="goes-tags">
                {ev.tags.map((t) => (
                  <span key={t} className="goes-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Price list trigger */}
        <div className="pricelist-trigger reveal">
          <div className="pricelist-trigger-text">
            <span className="eyebrow" style={{ color: 'var(--ice)' }}>Investasi Acaramu</span>
            <strong>Lihat Price List Lengkap</strong>
            <span>Tersedia paket bingsoo, dimsum, gyoza, dan mix untuk berbagai skala acara.</span>
          </div>
          <button className="btn btn-light" onClick={() => setBookOpen(true)}>
            📋 Buka Price List
          </button>
        </div>

        <div className="goes-cta reveal">
          <div className="goes-cta-text">
            <strong>Tertarik punya Koneo di acaramu?</strong>
            <span>Hubungi kami sekarang untuk diskusi paket dan ketersediaan tanggal.</span>
          </div>
          <a
            href={waLink('Halo Koneo! Saya tertarik dengan layanan Koneo Goes To untuk acara saya. Bisa info lebih lanjut?')}
            target="_blank" rel="noopener" className="btn"
          >
            Hubungi via WhatsApp →
          </a>
        </div>
      </div>

      {bookOpen && <BookViewer onClose={() => setBookOpen(false)} />}
    </section>
  )
}
