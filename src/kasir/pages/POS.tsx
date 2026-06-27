import { useState, useMemo } from 'react'
import { PRODUCTS, CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../products'
import { formatRupiah } from '../store'
import type { CartItem, KasirProduct, Transaction } from '../types'
import PaymentModal from '../components/PaymentModal'
import ReceiptModal from '../components/ReceiptModal'

interface VariantPickerProps {
  product: KasirProduct
  onSelect: (variantLabel: string, variantPrice: number) => void
  onClose: () => void
}

function VariantPicker({ product, onSelect, onClose }: VariantPickerProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{ background: '#1a1d27', borderRadius: 14, padding: 24, width: 300, border: '1px solid #2a2d3a', color: '#fff' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{product.icon} {product.name}</div>
        <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>Pilih ukuran</div>
        {product.variants!.map(v => (
          <button key={v.label} onClick={() => onSelect(v.label, v.price)} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', padding: '14px 16px', borderRadius: 10,
            background: '#0f1117', border: '1px solid #2a2d3a', color: '#fff',
            cursor: 'pointer', marginBottom: 8, fontSize: 14,
          }}>
            <span>{v.label}</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>{formatRupiah(v.price)}</span>
          </button>
        ))}
        <button onClick={onClose} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#2a2d3a', border: 'none', color: '#9ca3af', cursor: 'pointer', marginTop: 4 }}>
          Batal
        </button>
      </div>
    </div>
  )
}

export default function POS() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQ, setSearchQ] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in')
  const [tableNo, setTableNo] = useState('')
  const [discountPct, setDiscountPct] = useState(0)
  const [taxEnabled, setTaxEnabled] = useState(false)
  const [variantFor, setVariantFor] = useState<KasirProduct | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [completedTxn, setCompletedTxn] = useState<Transaction | null>(null)

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const matchSearch = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || (p.says ?? '').toLowerCase().includes(searchQ.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, searchQ])

  function addToCart(product: KasirProduct, variantLabel?: string, variantPrice?: number) {
    setCart(prev => {
      const key = product.id + (variantLabel ?? '')
      const existing = prev.find(i => i.product.id === product.id && i.variantLabel === variantLabel)
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { product, variantLabel, variantPrice, qty: 1 }]
    })
  }

  function handleProductClick(product: KasirProduct) {
    if (product.variants && product.variants.length > 0) {
      setVariantFor(product)
    } else {
      addToCart(product)
    }
  }

  function updateQty(idx: number, delta: number) {
    setCart(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], qty: next[idx].qty + delta }
      return next.filter(i => i.qty > 0)
    })
  }

  function removeItem(idx: number) {
    setCart(prev => prev.filter((_, i) => i !== idx))
  }

  function updateNote(idx: number, note: string) {
    setCart(prev => prev.map((item, i) => i === idx ? { ...item, note } : item))
  }

  const subtotal = cart.reduce((s, i) => s + (i.variantPrice ?? i.product.price) * i.qty, 0)
  const discountAmt = Math.round(subtotal * discountPct / 100)
  const taxAmt = taxEnabled ? Math.round((subtotal - discountAmt) * 0.1) : 0
  const total = subtotal - discountAmt + taxAmt

  function handlePaySuccess(txn: Transaction) {
    setShowPayment(false)
    setCompletedTxn(txn)
  }

  function handleNewTransaction() {
    setCart([])
    setDiscountPct(0)
    setTaxEnabled(false)
    setTableNo('')
    setCompletedTxn(null)
  }

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: 'hidden' }}>

      {/* Left: Product Grid */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #2a2d3a' }}>
        {/* Search */}
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <input
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            placeholder="🔍  Cari menu..."
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              background: '#1a1d27', border: '1px solid #2a2d3a',
              color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto', flexShrink: 0 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeCategory === cat ? '#f59e0b' : '#1a1d27',
              color: activeCategory === cat ? '#0f1117' : '#9ca3af',
              fontWeight: activeCategory === cat ? 700 : 400,
              fontSize: 13, whiteSpace: 'nowrap',
              outline: activeCategory === cat ? 'none' : '1px solid #2a2d3a',
            }}>
              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Products */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '0 20px 20px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, alignContent: 'start',
        }}>
          {filtered.map(product => {
            const inCart = cart.find(i => i.product.id === product.id)
            return (
              <button key={product.id} onClick={() => handleProductClick(product)} style={{
                background: '#1a1d27', border: `2px solid ${inCart ? '#f59e0b' : '#2a2d3a'}`,
                borderRadius: 12, padding: '14px 12px', cursor: 'pointer',
                textAlign: 'left', color: '#fff', transition: 'border-color 0.15s',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ fontSize: 24 }}>{product.icon || '🍽️'}</div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</div>
                {product.says && <div style={{ fontSize: 11, color: '#6b7280' }}>{product.says}</div>}
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginTop: 'auto' }}>
                  {product.variants ? `${formatRupiah(Math.min(...product.variants.map(v => v.price)))}+` : formatRupiah(product.price)}
                </div>
                {inCart && (
                  <div style={{ fontSize: 11, background: '#f59e0b', color: '#0f1117', borderRadius: 4, padding: '2px 6px', fontWeight: 700, alignSelf: 'flex-start' }}>
                    {cart.filter(i => i.product.id === product.id).reduce((s, i) => s + i.qty, 0)}x
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Cart */}
      <div style={{ width: 340, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
        {/* Order type + table */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #2a2d3a', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {(['dine_in', 'takeaway'] as const).map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12,
                background: orderType === t ? '#f59e0b' : '#1a1d27',
                color: orderType === t ? '#0f1117' : '#9ca3af',
                fontWeight: orderType === t ? 700 : 400,
                outline: orderType === t ? 'none' : '1px solid #2a2d3a',
              }}>
                {t === 'dine_in' ? '🪑 Dine In' : '🥡 Takeaway'}
              </button>
            ))}
          </div>
          {orderType === 'dine_in' && (
            <input
              value={tableNo}
              onChange={e => setTableNo(e.target.value)}
              placeholder="No. Meja (opsional)"
              style={{
                width: '100%', padding: '8px 12px', borderRadius: 8,
                background: '#0f1117', border: '1px solid #2a2d3a',
                color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box',
              }}
            />
          )}
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#4b5563', fontSize: 13, paddingTop: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🛒</div>
              Belum ada item
            </div>
          ) : cart.map((item, idx) => {
            const price = item.variantPrice ?? item.product.price
            return (
              <div key={idx} style={{ marginBottom: 12, background: '#1a1d27', borderRadius: 10, padding: '10px 12px', border: '1px solid #2a2d3a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
                      {item.product.icon} {item.product.name}
                      {item.variantLabel && <span style={{ color: '#6b7280', fontWeight: 400 }}> · {item.variantLabel}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>{formatRupiah(price)}</div>
                  </div>
                  <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>✕</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQty(idx, -1)} style={qtyBtnStyle}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(idx, 1)} style={qtyBtnStyle}>+</button>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{formatRupiah(price * item.qty)}</div>
                </div>
                <input
                  value={item.note ?? ''}
                  onChange={e => updateNote(idx, e.target.value)}
                  placeholder="Catatan (opsional)"
                  style={{
                    marginTop: 8, width: '100%', padding: '6px 10px', borderRadius: 6,
                    background: '#0f1117', border: '1px solid #2a2d3a',
                    color: '#9ca3af', fontSize: 12, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Summary & checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '14px 16px', borderTop: '1px solid #2a2d3a', flexShrink: 0 }}>
            {/* Discount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Diskon</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {[0, 5, 10, 15, 20].map(d => (
                  <button key={d} onClick={() => setDiscountPct(d)} style={{
                    padding: '4px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11,
                    background: discountPct === d ? '#f59e0b' : '#2a2d3a',
                    color: discountPct === d ? '#0f1117' : '#9ca3af',
                    fontWeight: discountPct === d ? 700 : 400,
                  }}>
                    {d === 0 ? '–' : `${d}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tax toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Pajak 10%</span>
              <button onClick={() => setTaxEnabled(p => !p)} style={{
                padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11,
                background: taxEnabled ? '#6366f1' : '#2a2d3a',
                color: '#fff', fontWeight: taxEnabled ? 700 : 400,
              }}>
                {taxEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Totals */}
            <div style={{ background: '#0f1117', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontSize: 12, color: '#fff' }}>{formatRupiah(subtotal)}</span>
              </div>
              {discountAmt > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>Diskon ({discountPct}%)</span>
                  <span style={{ fontSize: 12, color: '#ef4444' }}>- {formatRupiah(discountAmt)}</span>
                </div>
              )}
              {taxAmt > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>Pajak (10%)</span>
                  <span style={{ fontSize: 12, color: '#fff' }}>{formatRupiah(taxAmt)}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid #2a2d3a', paddingTop: 8, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>TOTAL</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#f59e0b' }}>{formatRupiah(total)}</span>
              </div>
            </div>

            <button onClick={() => setShowPayment(true)} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none', color: '#fff', fontWeight: 700, fontSize: 15,
              cursor: 'pointer',
            }}>
              💳 Bayar {formatRupiah(total)}
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {variantFor && (
        <VariantPicker
          product={variantFor}
          onSelect={(label, price) => { addToCart(variantFor, label, price); setVariantFor(null) }}
          onClose={() => setVariantFor(null)}
        />
      )}
      {showPayment && (
        <PaymentModal
          items={cart}
          subtotal={subtotal}
          discount={discountAmt}
          tax={taxAmt}
          total={total}
          orderType={orderType}
          tableNo={tableNo}
          onSuccess={handlePaySuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
      {completedTxn && (
        <ReceiptModal
          transaction={completedTxn}
          onClose={handleNewTransaction}
          onNew={handleNewTransaction}
        />
      )}
    </div>
  )
}

const qtyBtnStyle: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 6, background: '#2a2d3a',
  border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
