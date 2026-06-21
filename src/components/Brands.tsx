const brands = [
  {
    id: 'softserve',
    tag: 'Signature Dessert',
    name: 'Soft Serve Ice Cream',
    desc:
      'Premium event-catering soft serve ice cream in a wide range of flavours. Perfect for weddings, corporate events, and celebrations.',
    flavours: ['Vanilla', 'Strawberry', 'Mango', 'Biscoff', 'Cookies & Cream', 'Matcha', 'Tiramisu', 'Chocolate', 'Blackcurrant'],
    icon: '🍦',
    accent: '#cfe0f0',
    textAccent: '#093a72',
  },
  {
    id: 'dimsum',
    tag: 'Asian Bites',
    name: 'Dimsum & Gyoza',
    desc:
      'Handcrafted dimsum mentai and gyoza mentai for events and to-go orders. Available as standalone packs or mixed combos.',
    flavours: ['Dimsum Mentai', 'Gyoza Mentai', 'Mix Combo'],
    icon: '🥟',
    accent: '#f5e6c8',
    textAccent: '#7a4520',
  },
]

export default function Brands() {
  return (
    <section id="brands" className="mipo-section">
      <div className="wrap">
        <div className="sec-header reveal">
          <span className="mipo-eyebrow">Our Brands</span>
          <h2>What We Offer</h2>
          <p>MIPO GROUP operates two flagship product lines under the <strong>KONEO</strong> brand, bringing joy and flavour to every event.</p>
        </div>

        <div className="brands-grid">
          {brands.map((b) => (
            <div
              key={b.id}
              className="brand-card reveal"
              style={{ '--brand-accent': b.accent, '--brand-text': b.textAccent } as React.CSSProperties}
            >
              <div className="brand-icon-wrap">
                <span className="brand-icon">{b.icon}</span>
              </div>
              <div className="brand-body">
                <span className="brand-tag">{b.tag}</span>
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
                <div className="brand-flavours">
                  {b.flavours.map((f) => (
                    <span key={f} className="flavour-chip">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
