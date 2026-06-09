import { LINKS, waLink } from '../config'

export default function Visit() {
  return (
    <section id="visit" className="pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Mampir, Yuk</span>
            <h2 className="display">Kunjungi Koneo</h2>
          </div>
        </div>
        <div className="visit-grid">
          <div className="reveal">
            <ul className="info-list">
              <li><span className="k">Alamat</span><span className="v">Jl. Nangka Utara No. 189<small>Tonja, Denpasar Utara, Bali 83661</small></span></li>
              <li><span className="k">Jam Buka</span><span className="v">Setiap hari · 10.00–22.00 WITA<small>Last order 21.30 WITA</small></span></li>
              <li><span className="k">Suasana</span><span className="v">Indoor &amp; Outdoor · Aesthetic<small>Free Wi-Fi · Instagramable</small></span></li>
              <li><span className="k">Pesan</span><span className="v">GoFood · Datang Langsung<small>Range harga 40rb–100rb</small></span></li>
            </ul>
            <div className="hero-cta" style={{ marginTop: '1.8rem' }}>
              <a href={waLink()} target="_blank" rel="noopener" className="btn">Pesan via WhatsApp</a>
              <a href={LINKS.maps} target="_blank" rel="noopener" className="btn ghost">Buka di Google Maps →</a>
            </div>
          </div>
          <a className="map reveal" href={LINKS.maps} target="_blank" rel="noopener" aria-label="Lokasi Koneo di peta">
            <svg className="map-streets" viewBox="0 0 400 340" preserveAspectRatio="none">
              <g stroke="#093a72" strokeOpacity=".18" strokeWidth="6" fill="none">
                <path d="M-10 90 H410" /><path d="M-10 220 H410" />
                <path d="M120 -10 V350" /><path d="M280 -10 V350" />
                <path d="M-10 40 L200 170 L410 40" strokeOpacity=".1" />
              </g>
            </svg>
            <div className="pin">
              <div className="marker" />
              <b>Koneo Indonesia</b>
              <div style={{ fontSize: '.8rem', opacity: 0.7 }}>Jl. Nangka Utara No.189</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
