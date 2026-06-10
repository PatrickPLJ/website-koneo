import KoneoLogo from './KoneoLogo'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="hero-tag reveal"><span className="pulse" />First Korean Bingsoo Bar in Bali</span>
          <h1 className="display reveal">First<br />Bingsoo Bar<br /><em>in Bali.</em></h1>
          <p className="hero-sub reveal">
            Bingsoo yang lembut, segar, dan ramah kantong — disajikan di sudut paling <em>aesthetic</em> Denpasar. Mulai dari 20rb-an aja.
          </p>
          <div className="hero-cta reveal">
            <a href="#menu" className="btn">Lihat Menu</a>
            <a href="#visit" className="btn ghost">Cari Lokasi</a>
          </div>
          <div className="hero-meta reveal">
            <div><b>4.9★</b><span>961 Ulasan Google</span></div>
            <div><b>10–22</b><span>Buka Tiap Hari · WITA</span></div>
            <div><b>#1</b><span>Bingsoo Bar di Bali</span></div>
          </div>
        </div>
        <div className="hero-art reveal">
          <KoneoLogo />
        </div>
      </div>
    </section>
  )
}
