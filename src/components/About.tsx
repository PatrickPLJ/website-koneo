const feats = [
  { icon: '❄️', title: 'Bingsoo Pertama di Bali', desc: 'Korean Bingsoo Bar pertama di Pulau Dewata. Es serut autentik yang lembut dan lumer.' },
  { icon: '🧊', title: 'Lembut & Menyegarkan', desc: 'Tekstur halus yang lumer di mulut — pas banget buat ngademin cuaca panas Bali.' },
  { icon: '💸', title: 'Ramah di Kantong', desc: 'Menu mulai 20rb-an aja. Puas nyobain banyak varian tanpa bikin dompet nangis.' },
  { icon: '📸', title: 'Spot Instagramable', desc: 'Tiap sudut dibuat aesthetic, indoor maupun outdoor — siap jadi konten kamu.' },
  { icon: '🍽️', title: 'Bukan Cuma Bingsoo', desc: 'Ada makanan berat ala Korea, cemilan gurih, sampai minuman segar.' },
  { icon: '⭐', title: 'Dicintai Pelanggan', desc: 'Rating 4.8 dari 598 ulasan Google. Banyak yang ketagihan dan balik lagi.' },
]

export default function About() {
  return (
    <section id="voice" className="pad">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="about-head reveal">
          <span className="eyebrow">Kenapa Koneo</span>
          <h2 className="display">Bukan sekadar es serut biasa.</h2>
          <p>Koleksi alasan kenapa Koneo jadi tempat ngadem favorit di Denpasar — tiap detail dibuat dengan niat, rasa, dan gaya.</p>
        </div>
        <div className="feat-grid">
          {feats.map((f) => (
            <div className="feat reveal" key={f.title}>
              <div className="ico">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
