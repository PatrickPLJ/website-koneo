import { waLink } from '../config'

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

export default function GoesTo() {
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

        <div className="goes-cta reveal">
          <div className="goes-cta-text">
            <strong>Tertarik punya Koneo di acaramu?</strong>
            <span>Hubungi kami sekarang untuk diskusi paket dan ketersediaan tanggal.</span>
          </div>
          <a href={waLink('Halo Koneo! Saya tertarik dengan layanan Koneo Goes To untuk acara saya. Bisa info lebih lanjut?')}
            target="_blank" rel="noopener" className="btn">
            Hubungi via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
