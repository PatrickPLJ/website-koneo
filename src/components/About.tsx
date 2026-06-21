const pillars = [
  {
    icon: '🎉',
    title: 'Event Excellence',
    desc: 'From intimate gatherings to large-scale corporate events, we bring premium food experiences on-site.',
  },
  {
    icon: '🌟',
    title: 'Quality First',
    desc: 'Only the finest ingredients go into our products. Every serve is consistent, fresh, and delightful.',
  },
  {
    icon: '🤝',
    title: 'Reliable Service',
    desc: 'Our professional staff handles setup, service, and cleanup — so you can focus on your event.',
  },
  {
    icon: '📍',
    title: 'Bali Based',
    desc: 'Proudly rooted in Bali, serving clients across Denpasar and beyond with passion and care.',
  },
]

export default function About() {
  return (
    <section id="about" className="mipo-section">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-text reveal">
            <span className="mipo-eyebrow">Who We Are</span>
            <h2>Built on flavour, driven by experience</h2>
            <p>
              MIPO GROUP is a Bali-based food and events company operating the <strong>KONEO</strong> brand.
              We specialise in bringing premium soft serve ice cream and handcrafted dimsum &amp; gyoza
              directly to your events — fully staffed, fully equipped, fully delicious.
            </p>
            <p>
              From weddings and birthday parties to corporate galas, our booth setups create moments
              your guests will remember long after the last bite.
            </p>
            <a href="#contact" className="mipo-btn" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Work With Us</a>
          </div>
          <div className="about-pillars reveal">
            {pillars.map((p) => (
              <div key={p.title} className="pillar-card">
                <span className="pillar-icon">{p.icon}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
