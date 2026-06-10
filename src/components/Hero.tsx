import BingsooBowl from './BingsooBowl'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="hero-tag reveal"><span className="pulse" />First Korean Bingsoo Bar in Bali</span>
          <h1 className="display reveal">Bingsoo<br />Korea, <em>diadem</em><br />di Bali.</h1>
          <p className="hero-sub reveal">
            Bingsoo yang lembut, segar, dan ramah kantong — disajikan di sudut paling <em>aesthetic</em> Denpasar. Mulai dari 20rb-an aja.
          </p>
          <div className="hero-cta reveal">
            <a href="#menu" className="btn">Lihat Menu</a>
            <a href="#visit" className="btn ghost">Cari Lokasi</a>
          </div>
          <div className="hero-meta reveal">
            <div><b>4.7★</b><span>497 Ulasan Google</span></div>
            <div><b>10–22</b><span>Buka Tiap Hari · WITA</span></div>
            <div><b>#1</b><span>Bingsoo Bar di Bali</span></div>
          </div>
        </div>
        <div className="hero-art reveal">
          <BingsooBowl />
        </div>
      </div>
    </section>
  )
}
