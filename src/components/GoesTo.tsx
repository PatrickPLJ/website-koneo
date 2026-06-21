import { useState } from 'react'
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

const priceGroups = [
  {
    label: '❄️ Bingsoo',
    pages: [
      { name: 'Vanilla Based', file: '/pricelist/bingsoo-vanilla.jpg' },
      { name: 'Non Vanilla Based', file: '/pricelist/bingsoo-non-vanilla.jpg' },
      { name: 'Mix Based', file: '/pricelist/bingsoo-mix.jpg' },
    ],
  },
  {
    label: '🥟 Dimsum',
    pages: [
      { name: 'Dimsum Mentai (1)', file: '/pricelist/togo-dimsum-1.jpg' },
      { name: 'Dimsum Mentai (2)', file: '/pricelist/togo-dimsum-2.jpg' },
    ],
  },
  {
    label: '🥟 Gyoza',
    pages: [
      { name: 'Gyoza Mentai (1)', file: '/pricelist/togo-gyoza-1.jpg' },
      { name: 'Gyoza Mentai (2)', file: '/pricelist/togo-gyoza-2.jpg' },
    ],
  },
  {
    label: '🎉 Mix',
    pages: [
      { name: 'Mix Dimsum & Gyoza (1)', file: '/pricelist/togo-mix-1.jpg' },
      { name: 'Mix Dimsum & Gyoza (2)', file: '/pricelist/togo-mix-2.jpg' },
    ],
  },
]

export default function GoesTo() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const pages = priceGroups[activeGroup].pages

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

        {/* ── PRICE LIST ── */}
        <div className="pricelist-block reveal">
          <div className="pricelist-head">
            <div>
              <span className="eyebrow" style={{ color: 'var(--ice)' }}>Investasi Acaramu</span>
              <h3 className="pricelist-title">Price List</h3>
            </div>
            <p className="pricelist-sub">Klik gambar untuk melihat detail harga secara lengkap.</p>
          </div>

          {/* Tab filter */}
          <div className="pricelist-tabs">
            {priceGroups.map((g, i) => (
              <button
                key={g.label}
                className={`pl-tab${i === activeGroup ? ' active' : ''}`}
                onClick={() => setActiveGroup(i)}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Price pages grid */}
          <div className="pricelist-grid">
            {pages.map((p) => (
              <button
                key={p.file}
                className="pricelist-thumb"
                onClick={() => setLightbox(p.file)}
                aria-label={`Lihat ${p.name}`}
              >
                <img src={menuImgUrl(p.file)} alt={p.name} loading="lazy" />
                <span className="pricelist-thumb-label">{p.name}</span>
                <span className="pricelist-zoom">🔍 Tap untuk zoom</span>
              </button>
            ))}
          </div>
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="pl-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Price list fullscreen"
        >
          <button className="pl-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={menuImgUrl(lightbox)}
            alt="Price list"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
