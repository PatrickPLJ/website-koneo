import { useState } from 'react'
import { formatRupiah } from '../store'
import type { CartItem, Transaction } from '../types'
import { saveTransaction, generateReceiptNo, getCashierName } from '../store'

interface Props {
  items: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  orderType: 'dine_in' | 'takeaway'
  tableNo: string
  onSuccess: (txn: Transaction) => void
  onClose: () => void
}

export default function PaymentModal({ items, subtotal, discount, tax, total, orderType, tableNo, onSuccess, onClose }: Props) {
  const [method, setMethod] = useState<'cash' | 'qris' | 'transfer'>('cash')
  const [cashInput, setCashInput] = useState('')
  const [error, setError] = useState('')

  const cashPaid = cashInput ? parseInt(cashInput.replace(/\D/g, ''), 10) : 0
  const change = cashPaid - total

  const quickAmounts = [total, 50000, 100000, 150000, 200000].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 4)

  function handlePay() {
    if (method === 'cash') {
      if (!cashInput || cashPaid < total) {
        setError('Jumlah uang kurang dari total')
        return
      }
    }
    const txn: Transaction = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod: method,
      cashPaid: method === 'cash' ? cashPaid : undefined,
      cashChange: method === 'cash' ? Math.max(0, change) : undefined,
      cashier: getCashierName(),
      tableNo: tableNo || undefined,
      orderType,
      receiptNo: generateReceiptNo(),
    }
    saveTransaction(txn)
    onSuccess(txn)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        background: '#1a1d27', borderRadius: 16, width: '100%', maxWidth: 440,
        border: '1px solid #2a2d3a', color: '#fff',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a2d3a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Pembayaran</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 20 }}>✕</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {/* Total */}
          <div style={{ background: '#0f1117', borderRadius: 12, padding: '16px 20px', textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Total Pembayaran</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#f59e0b' }}>{formatRupiah(total)}</div>
          </div>

          {/* Method */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>Metode Pembayaran</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {([['cash', '💵', 'Tunai'], ['qris', '📱', 'QRIS'], ['transfer', '🏦', 'Transfer']] as const).map(([m, icon, label]) => (
                <button key={m} onClick={() => setMethod(m as any)} style={{
                  flex: 1, padding: '12px 8px', borderRadius: 10,
                  background: method === m ? '#f59e0b' : '#0f1117',
                  border: `2px solid ${method === m ? '#f59e0b' : '#2a2d3a'}`,
                  color: method === m ? '#0f1117' : '#fff',
                  fontWeight: method === m ? 700 : 400,
                  cursor: 'pointer', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Cash input */}
          {method === 'cash' && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Uang Diterima</div>
              <input
                value={cashInput ? formatRupiah(cashPaid) : ''}
                onChange={e => setCashInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Masukkan jumlah uang"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  background: '#0f1117', border: '1px solid #2a2d3a',
                  color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {quickAmounts.map(v => (
                  <button key={v} onClick={() => setCashInput(String(v))} style={{
                    flex: 1, padding: '8px 4px', borderRadius: 8, background: '#2a2d3a',
                    border: 'none', color: '#fff', cursor: 'pointer', fontSize: 11,
                  }}>
                    {formatRupiah(v)}
                  </button>
                ))}
              </div>
              {cashPaid >= total && (
                <div style={{ marginTop: 12, background: '#0f1117', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontSize: 13 }}>Kembalian</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{formatRupiah(change)}</span>
                </div>
              )}
            </div>
          )}

          {method === 'qris' && (
            <div style={{ textAlign: 'center', padding: '16px', marginBottom: 16 }}>
              <div style={{ background: '#fff', display: 'inline-block', padding: 12, borderRadius: 12 }}>
                <div style={{ fontSize: 80, lineHeight: 1 }}>📱</div>
              </div>
              <div style={{ color: '#6b7280', fontSize: 13, marginTop: 10 }}>Scan QRIS untuk membayar</div>
            </div>
          )}

          {method === 'transfer' && (
            <div style={{ background: '#0f1117', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>Rekening Tujuan</div>
              <div style={{ fontSize: 14, color: '#fff' }}>BCA: 1234567890</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>a.n. Koneo Indonesia</div>
            </div>
          )}

          {error && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <button onClick={handlePay} style={{
            width: '100%', padding: '16px', borderRadius: 12,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            border: 'none', color: '#fff', fontWeight: 700, fontSize: 16,
            cursor: 'pointer',
          }}>
            {method === 'cash' ? '✅ Bayar & Cetak Struk' : '✅ Konfirmasi Pembayaran'}
          </button>
        </div>
      </div>
    </div>
  )
}
