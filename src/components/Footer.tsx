import { LINKS, waLink } from '../config'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <h4 className="serif">Koneo<br />Indonesia</h4>
            <p style={{ opacity: 0.8, maxWidth: '30ch' }}>
              First Korean Bingsoo Bar in Bali. Dingin, lembut, dan selalu bikin balik lagi. ❄️
            </p>
          </div>
          <div>
            <div className="col-head">Jelajahi</div>
            <ul>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#voice">Kenapa Koneo</a></li>
              <li><a href="#story">Cerita Kami</a></li>
              <li><a href="#visit">Lokasi &amp; Jam</a></li>
            </ul>
          </div>
          <div>
            <div className="col-head">Terhubung</div>
            <ul>
              <li><a href={waLink()} target="_blank" rel="noopener">WhatsApp · Pesan Langsung</a></li>
              <li><a href={LINKS.instagram} target="_blank" rel="noopener">Instagram · @koneo.ind</a></li>
              <li><a href={LINKS.tiktok} target="_blank" rel="noopener">TikTok · @koneoindonesia</a></li>
              <li><a href={LINKS.gofood} target="_blank" rel="noopener">Pesan via GoFood</a></li>
              <li><a href={LINKS.maps} target="_blank" rel="noopener">Google Maps</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Koneo Indonesia · Denpasar, Bali</span>
          <span>Dibuat dengan ❄️ untuk pencinta bingsoo</span>
        </div>
      </div>
    </footer>
  )
}
