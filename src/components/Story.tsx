import { LINKS } from '../config'

const reviews = [
  {
    initials: 'AG',
    name: 'Alexander G',
    date: 'September 2025',
    stars: 5,
    text: 'This place was fantastic! The bingsoo here is one of the best I\'ve tried — creamy, silky, and not too sweet. Worth every penny.',
  },
  {
    initials: 'GT',
    name: 'Gek T',
    date: 'Mei 2024',
    stars: 5,
    text: 'Salah satu tempat wajib coba dessert Korea di Denpasar. Bingsoo matcha-nya lembut banget, rasanya milky, dan porsinya besar — bisa berdua!',
  },
  {
    initials: 'RN',
    name: 'Rizky N',
    date: 'Agustus 2024',
    stars: 5,
    text: 'Bingsoo paling enak di Bali menurut aku. Teksturnya beda dari yang lain — lumer di mulut, creamy, dan nggak bikin eneg. Parkir agak susah tapi worth it banget!',
  },
  {
    initials: 'DM',
    name: 'Dita M',
    date: 'Januari 2025',
    stars: 5,
    text: 'Koneo selalu jadi pilihan tiap kali mau ngadem di Denpasar. Tempatnya aesthetic, Wi-Fi kenceng, dan bingsoo strawberry-nya juara. Udah balik berkali-kali!',
  },
]

function Stars({ n }: { n: number }) {
  return <span className="stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

export default function Story() {
  return (
    <section id="story" className="pad">
      <div className="wrap">
        <div className="story-intro reveal">
          <div>
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
              <a href="https://www.google.com/maps/search/?api=1&query=Koneo+Indonesia+Jl.+Nangka+Utara+Denpasar" target="_blank" rel="noopener" className="btn ghost">Tulis Ulasan →</a>
            </div>
          </div>

          <div className="rating-badge reveal">
            <div className="rating-score">4.7</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-label">Google Reviews</div>
            <div className="rating-count">497 ulasan</div>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((r) => (
            <div className="review-card reveal" key={r.name}>
              <Stars n={r.stars} />
              <p className="quote">"{r.text}"</p>
              <div className="review-row">
                <div className="avatar">{r.initials}</div>
                <div>
                  <strong>{r.name}</strong>
                  <div className="review-meta">Google Maps · {r.date}</div>
                </div>
                <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
