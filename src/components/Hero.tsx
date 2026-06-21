import MipoLogo from './MipoLogo'

export default function Hero() {
  return (
    <section className="mipo-hero" id="top">
      <div className="hero-bg">
        <div className="hero-blob h-blob1" />
        <div className="hero-blob h-blob2" />
        <div className="hero-blob h-blob3" />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-content reveal">
          <span className="hero-eyebrow">Welcome to</span>
          <MipoLogo className="hero-logo" />
          <p className="hero-tagline">
            Creating memorable experiences through <em>premium food &amp; events</em>
          </p>
          <div className="hero-btns">
            <a href="#pricelist" className="mipo-btn">View Price List</a>
            <a href="#contact" className="mipo-btn ghost">Get in Touch</a>
          </div>
        </div>
        <div className="hero-stats reveal">
          <div className="stat-item">
            <b>500+</b>
            <span>Events Served</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <b>2</b>
            <span>Product Lines</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <b>100%</b>
            <span>Quality Promise</span>
          </div>
        </div>
      </div>
    </section>
  )
}
