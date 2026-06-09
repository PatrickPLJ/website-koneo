import { LINKS } from '../config'

export default function Story() {
  return (
    <section id="story" className="pad">
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow" style={{ color: 'var(--berry)' }}>Cerita Kami</span>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)' }}>
            Bingsoo pertama,<br />di kota yang panas.
          </h2>
          <p style={{ marginTop: '1.2rem', maxWidth: '46ch', opacity: 0.8 }}>
            Koneo lahir untuk menjawab cuaca Bali yang bikin gerah — sesuatu yang lembut, dingin, dan menyenangkan.
            Sejak hari pertama, kami jadi <strong>Korean Bingsoo Bar pertama di Bali</strong>, dengan tiap sudut yang
            sengaja dibuat <em>aesthetic</em> buat diabadikan. Indoor, outdoor, free Wi-Fi — tinggal duduk dan ngadem.
          </p>
          <div className="hero-cta" style={{ marginTop: '1.6rem' }}>
            <a href={LINKS.instagram} target="_blank" rel="noopener" className="btn">Lihat Instagram</a>
          </div>
        </div>
        <div className="story-card reveal">
          <div className="stars">★★★★★</div>
          <p className="quote">
            “Suddenly got this crazy craving for bingsoo 😭 OMG it’s sooo good — not too sweet, super soft, literally the best!”
          </p>
          <div className="review-row">
            <div className="avatar">IA</div>
            <div>
              <strong>Pelanggan Google</strong>
              <div style={{ fontSize: '.82rem', opacity: 0.7 }}>Salah satu dari 598 ulasan · 4.8 / 5</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
