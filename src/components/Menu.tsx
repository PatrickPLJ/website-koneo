import { useState, type CSSProperties } from 'react'
import { MENU, type Category } from '../data/menu'

type Filter = 'all' | Category

const filters: { f: Filter; label: string }[] = [
  { f: 'all',       label: 'Semua' },
  { f: 'bingsoo',   label: '❄️ Bingsoo' },
  { f: 'rice_bowl', label: '🍚 Rice Bowl' },
  { f: 'bite',      label: '🍗 Bite' },
  { f: 'coffee',    label: '☕ Coffee' },
  { f: 'sweety',    label: '🧁 Sweety' },
  { f: 'tea',       label: '🍵 Tea' },
  { f: 'milky',     label: '🧋 Milky' },
  { f: 'mojito',    label: '🍹 Mojito' },
  { f: 'toppings',  label: '✨ Toppings' },
]

const catColor: Record<string, string> = {
  bingsoo:  '#dfeaf6',
  rice_bowl:'#f3e3cf',
  bite:     '#f3e3cf',
  coffee:   '#e8ddd0',
  sweety:   '#f5dde8',
  tea:      '#e3efda',
  milky:    '#f0eaff',
  mojito:   '#d6f0e8',
  toppings: '#fef3cd',
}

export default function Menu() {
  const [active, setActive] = useState<Filter>('all')

  const items = MENU.filter(
    (item) => active === 'all' || item.cat === active
  )

  const isToppings = (cat: string) => cat === 'toppings'

  return (
    <section id="menu" className="pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Yang Bikin Adem</span>
            <h2 className="display">Menu Koneo</h2>
          </div>
          <p style={{ maxWidth: '34ch', opacity: 0.75 }}>
            Bingsoo Korea signature, makanan berat ala Korea, sampai minuman seger. Harga mulai 20rb.
          </p>
        </div>

        {/* Soft Ice seasonal banner */}
        <div className="soft-ice-banner reveal">
          <span className="soft-ice-badge">Seasonal Menu</span>
          <div>
            <strong>Soft Ice</strong>
            <span>Menu musiman dengan varian rasa yang berganti setiap periode. Harga menyesuaikan season.</span>
          </div>
          <span className="soft-ice-time">10.00 – 21.00</span>
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
          {items.map((item, i) => (
            <article
              key={i}
              className="card reveal"
              data-c={item.cat}
              style={{ '--ico-bg': catColor[item.cat] } as CSSProperties}
            >
              <div className="ico">{item.icon}</div>
              <h3>
                {item.name}
                {item.says && <span className="says">{item.says}</span>}
              </h3>
              {item.desc && <p>{item.desc}</p>}

              {item.variants ? (
                <div className="variants">
                  {item.variants.map((v) => (
                    <div className="variant-row" key={v.label}>
                      <span className="variant-label">{v.label}</span>
                      <span className="price">{v.price}</span>
                    </div>
                  ))}
                  {item.fav && <span className="fav">Best Seller</span>}
                </div>
              ) : (
                <div className={`price${isToppings(item.cat) ? ' topping-price' : ''}`}>
                  {item.price}
                  {item.fav && <span className="fav">Best Seller</span>}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
