import { useEffect, useState } from 'react'
import type { MenuItem } from '../data/menu'

interface Props {
  item: MenuItem
  onClose: () => void
}

const catLabel: Record<string, string> = {
  bingsoo:  '❄️ Bingsoo',
  rice_bowl:'🍚 Rice Bowl',
  bite:     '🍗 Bite',
  beverage: '🥤 Beverage',
  toppings: '✨ Toppings',
}

export default function MenuModal({ item, onClose }: Props) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    setImgIdx(0)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, item])

  const hasImages = item.images && item.images.length > 0
  const currentImg = hasImages ? item.images![imgIdx] : null

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">✕</button>

        {/* Image area */}
        <div className="modal-img" data-c={item.cat}>
          {currentImg ? (
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${currentImg.src}`}
              alt={`${item.name} ${currentImg.label}`}
              className="modal-photo"
            />
          ) : (
            <>
              <span className="modal-img-icon">{item.icon}</span>
              <span className="modal-img-hint">Foto segera hadir</span>
            </>
          )}

          {/* Image switcher tabs */}
          {item.images && item.images.length > 1 && (
            <div className="modal-img-tabs">
              {item.images.map((img, i) => (
                <button
                  key={img.label}
                  className={`modal-img-tab${i === imgIdx ? ' active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                >
                  {img.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="modal-cat-badge" data-c={item.cat}>
            {catLabel[item.cat]}
          </div>

          <h2 className="modal-title">{item.name}</h2>
          {item.says && <p className="modal-says">{item.says}</p>}
          {item.desc && <p className="modal-desc">{item.desc}</p>}

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

          {item.fav && <div className="modal-fav-badge">⭐ Best Seller</div>}
        </div>
      </div>
    </div>
  )
}
