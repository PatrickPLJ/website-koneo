import { useState, type CSSProperties } from 'react'
import { MENU, BEVERAGE_GROUPS, type Category, type BeverageSub } from '../data/menu'

type Filter = 'all' | Category

const filters: { f: Filter; label: string }[] = [
  { f: 'all',       label: 'Semua' },
  { f: 'bingsoo',   label: '❄️ Bingsoo' },
  { f: 'rice_bowl', label: '🍚 Rice Bowl' },
  { f: 'bite',      label: '🍗 Bite' },
  { f: 'beverage',  label: '🥤 Beverage' },
  { f: 'toppings',  label: '✨ Toppings' },
]

const catColor: Record<string, string> = {
  bingsoo:  '#dfeaf6',
  rice_bowl:'#f3e3cf',
  bite:     '#f3e3cf',
  beverage: '#e3efda',
  toppings: '#fef3cd',
}

const subColor: Record<BeverageSub, string> = {
  coffee: '#e8ddd0',
  sweety: '#f5dde8',
  tea:    '#e3efda',
  milky:  '#f0eaff',
  mojito: '#d6f0e8',
}

function MenuCard({ item }: { item: typeof MENU[number] }) {
  const icoColor = item.sub ? subColor[item.sub] : catColor[item.cat]
  return (
    <article
      className="card reveal"
      data-c={item.cat}
      style={{ '--ico-bg': icoColor } as CSSProperties}
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
        <div className={`price${item.cat === 'toppings' ? ' topping-price' : ''}`}>
          {item.price}
          {item.fav && <span className="fav">Best Seller</span>}
        </div>
      )}
    </article>
  )
}

export default function Menu() {
  const [active, setActive] = useState<Filter>('all')

  const showBeverage = active === 'all' || active === 'beverage'
  const nonBeverageItems = MENU.filter(
    (item) => item.cat !== 'beverage' && (active === 'all' || item.cat === active)
  )

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

        {/* Non-beverage items */}
        {nonBeverageItems.length > 0 && (
          <div className="menu-grid">
            {nonBeverageItems.map((item, i) => <MenuCard key={i} item={item} />)}
          </div>
        )}

        {/* Beverage section grouped by sub-category */}
        {showBeverage && (
          <div className="beverage-section">
            {BEVERAGE_GROUPS.map((group) => {
              const items = MENU.filter(
                (item) => item.cat === 'beverage' && item.sub === group.sub
              )
              return (
                <div key={group.sub} className="bev-group">
                  <h3 className="bev-group-title reveal">
                    <span className="bev-group-icon">{group.icon}</span>
                    {group.label}
                  </h3>
                  <div className="menu-grid">
                    {items.map((item, i) => <MenuCard key={i} item={item} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
