import { useState } from 'react'
import { MENU, type Category } from '../data/menu'

type Filter = 'all' | Category

const filters: { f: Filter; label: string }[] = [
  { f: 'all', label: 'Semua' },
  { f: 'bingsoo', label: '❄️ Bingsoo' },
  { f: 'food', label: '🍚 Makanan' },
  { f: 'drink', label: '🥤 Minuman' },
]

export default function Menu() {
  const [active, setActive] = useState<Filter>('all')

  return (
    <section id="menu" className="pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Yang Bikin Adem</span>
            <h2 className="display">Menu Koneo</h2>
          </div>
          <p style={{ maxWidth: '34ch', opacity: 0.75 }}>
            Es serut signature, makanan berat ala Korea, sampai minuman seger. Harga mulai 20rb.
          </p>
        </div>

        <div className="filter reveal" role="tablist">
          {filters.map((f) => (
            <button
              key={f.f}
              className={`chip${active === f.f ? ' active' : ''}`}
              onClick={() => setActive(f.f)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {MENU.map((item, i) => {
            const hidden = active !== 'all' && item.cat !== active
            return (
              <article key={i} className={`card reveal${hidden ? ' is-hidden' : ''}`} data-c={item.cat}>
                <div className="ico">{item.icon}</div>
                <h3>{item.name} <span className="says">{item.says}</span></h3>
                <p>{item.desc}</p>
                <div className="price">
                  {item.price}
                  {item.fav && <span className="fav">Best Seller</span>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
