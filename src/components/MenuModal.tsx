import { useEffect } from 'react'
import type { MenuItem } from '../data/menu'

interface Props {
  item: MenuItem
  onClose: () => void
}

export default function MenuModal({ item, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">✕</button>

        {/* Image area */}
        <div className="modal-img" data-c={item.cat}>
          <span className="modal-img-icon">{item.icon}</span>
          <span className="modal-img-hint">Foto segera hadir</span>
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="modal-cat-badge" data-c={item.cat}>
            {item.cat === 'bingsoo'   && '❄️ Bingsoo'}
            {item.cat === 'rice_bowl' && '🍚 Rice Bowl'}
            {item.cat === 'bite'      && '🍗 Bite'}
            {item.cat === 'beverage'  && '🥤 Beverage'}
            {item.cat === 'toppings'  && '✨ Toppings'}
          </div>

          <h2 className="modal-title">{item.name}</h2>
          {item.says && <p className="modal-says">{item.says}</p>}
          {item.desc && <p className="modal-desc">{item.desc}</p>}

          {/* Pricing */}
          <div className="modal-price-block">
            {item.variants ? (
              <>
                <p className="modal-price-label">Pilih Ukuran</p>
                <div className="modal-variants">
                  {item.variants.map((v) => (
                    <div className="modal-variant" key={v.label}>
                      <span className="modal-variant-name">{v.label}</span>
                      <span className="modal-variant-price">{v.price}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="modal-single-price">
                <span className="modal-price-label">Harga</span>
                <span className="modal-price-value">{item.price}</span>
              </div>
            )}
          </div>

          {item.fav && (
            <div className="modal-fav-badge">⭐ Best Seller</div>
          )}
        </div>
      </div>
    </div>
  )
}
