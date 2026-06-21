const softServePackages = [
  { label: '100 Portions', vanilla: 'Rp 2.200.000', nonVanilla: 'Rp 2.700.000', mix: 'Rp 2.500.000', duration: '4 hrs, 2 staff' },
  { label: '200 Portions', vanilla: 'Rp 3.800.000', nonVanilla: 'Rp 5.200.000', mix: 'Rp 4.800.000', duration: '6 hrs, 2 staff' },
  { label: '300 Portions', vanilla: 'Rp 5.500.000', nonVanilla: 'Rp 7.700.000', mix: 'Rp 5.500.000', duration: '8 hrs, 2 staff' },
  { label: '400 Portions', vanilla: 'Rp 7.400.000', nonVanilla: 'Rp 10.200.000', mix: null, duration: '4 hrs, 3 staff' },
  { label: '500 Portions', vanilla: 'Rp 9.000.000', nonVanilla: 'Rp 12.500.000', mix: null, duration: '6 hrs, 3 staff' },
]

const dimsumPackages = [
  { label: '300 pcs', dimsum: 'Rp 1.350.000', gyoza: 'Rp 1.500.000', mix: 'Rp 1.425.000', duration: '2 hrs, 2 staff' },
  { label: '500 pcs', dimsum: 'Rp 2.200.000', gyoza: 'Rp 2.500.000', mix: 'Rp 2.400.000', duration: '4 hrs, 2 staff' },
  { label: '800 pcs', dimsum: 'Rp 3.450.000', gyoza: 'Rp 4.000.000', mix: 'Rp 3.840.000', duration: '6 hrs, 3 staff' },
  { label: '1400 pcs', dimsum: 'Rp 5.750.000', gyoza: 'Rp 5.750.000', mix: 'Rp 5.750.000', duration: '6 hrs, 3 staff' },
  { label: '2000 pcs', dimsum: 'Rp 8.000.000', gyoza: 'Rp 8.000.000', mix: 'Rp 8.000.000', duration: '7 hrs, 4-5 staff' },
]

export default function PriceList() {
  return (
    <section id="pricelist" className="mipo-section mipo-dark">
      <div className="wrap">
        <div className="sec-header sec-header-light reveal">
          <span className="mipo-eyebrow light">Transparent Pricing</span>
          <h2>Event Price List</h2>
          <p>All packages include booth/food stall setup, serving materials, and on-site staff. Prices exclude shipping outside Denpasar.</p>
        </div>

        {/* Soft Serve */}
        <div className="price-block reveal">
          <div className="price-block-header">
            <span className="price-icon">🍦</span>
            <div>
              <h3>Soft Serve Ice Cream</h3>
              <p>Vanilla &amp; non-vanilla bases. Each package includes paper bowls, spoons, booth, and staff.</p>
            </div>
          </div>
          <div className="price-table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Vanilla Base</th>
                  <th>Non-Vanilla</th>
                  <th>Mix (50:50)</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {softServePackages.map((p) => (
                  <tr key={p.label}>
                    <td><strong>{p.label}</strong></td>
                    <td>{p.vanilla}</td>
                    <td>{p.nonVanilla}</td>
                    <td>{p.mix ?? '—'}</td>
                    <td><span className="duration-badge">{p.duration}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="price-notes">
            <p>✦ Vanilla flavours: Strawberry, Mango, Biscoff, Cookies &amp; Cream</p>
            <p>✦ Non-vanilla flavours: Matcha, Blackcurrant, Chocolate, Tiramisu</p>
            <p>✦ Down payment 50% required (remaining H-7 before event)</p>
          </div>
        </div>

        {/* Dimsum / Gyoza */}
        <div className="price-block reveal">
          <div className="price-block-header">
            <span className="price-icon">🥟</span>
            <div>
              <h3>Dimsum &amp; Gyoza Mentai</h3>
              <p>Each package includes paper plates, wooden forks, chili oil, and on-site staff.</p>
            </div>
          </div>
          <div className="price-table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Dimsum Mentai</th>
                  <th>Gyoza Mentai</th>
                  <th>Mix</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {dimsumPackages.map((p) => (
                  <tr key={p.label}>
                    <td><strong>{p.label}</strong></td>
                    <td>{p.dimsum}</td>
                    <td>{p.gyoza}</td>
                    <td>{p.mix}</td>
                    <td><span className="duration-badge">{p.duration}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="price-notes">
            <p>✦ Mix packages combine equal parts Dimsum &amp; Gyoza</p>
            <p>✦ Stand/table setup can be provided by buyer or our team</p>
            <p>✦ Shipping costs not included — free delivery in Denpasar</p>
          </div>
        </div>

        <div className="price-cta reveal">
          <div>
            <strong>Need a custom package?</strong>
            <span>Contact us directly for pax sizes not listed above</span>
          </div>
          <a href="#contact" className="mipo-btn">Request a Quote</a>
        </div>
      </div>
    </section>
  )
}
