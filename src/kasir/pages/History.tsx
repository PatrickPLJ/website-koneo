import { useState, useMemo } from 'react'
import { getTransactions, formatRupiah } from '../store'
import type { Transaction } from '../types'
import ReceiptModal from '../components/ReceiptModal'

const METHOD_LABEL: Record<string, string> = { cash: '💵 Tunai', qris: '📱 QRIS', transfer: '🏦 Transfer' }
const ORDER_LABEL: Record<string, string> = { dine_in: 'Dine In', takeaway: 'Takeaway' }

export default function History() {
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [selected, setSelected] = useState<Transaction | null>(null)

  const txns = useMemo(() => getTransactions(), [])

  const filtered = useMemo(() => {
    return txns.filter(t => {
      const matchSearch = !search || t.receiptNo.toLowerCase().includes(search.toLowerCase()) || t.cashier.toLowerCase().includes(search.toLowerCase())
      const matchDate = !dateFilter || t.date.startsWith(dateFilter)
      return matchSearch && matchDate
    })
  }, [txns, search, dateFilter])

  const totalFiltered = filtered.reduce((s, t) => s + t.total, 0)

  return (
    <div style={{ padding: '24px', fontFamily: "'Segoe UI', system-ui, sans-serif", color: '#fff' }}>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Riwayat Transaksi</div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari no. struk atau kasir..."
          style={inputStyle}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          style={{ ...inputStyle, width: 160 }}
        />
        {(search || dateFilter) && (
          <button onClick={() => { setSearch(''); setDateFilter('') }} style={clearBtnStyle}>
            Reset
          </button>
        )}
      </div>

      {/* Summary */}
      <div style={{ background: '#1a1d27', borderRadius: 12, padding: '14px 18px', marginBottom: 20, border: '1px solid #2a2d3a', display: 'flex', gap: 24 }}>
        <div><span style={{ color: '#6b7280', fontSize: 13 }}>Transaksi: </span><span style={{ fontWeight: 700 }}>{filtered.length}</span></div>
        <div><span style={{ color: '#6b7280', fontSize: 13 }}>Total: </span><span style={{ fontWeight: 700, color: '#10b981' }}>{formatRupiah(totalFiltered)}</span></div>
      </div>

      {/* Table */}
      <div style={{ background: '#1a1d27', borderRadius: 14, border: '1px solid #2a2d3a', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Tidak ada transaksi</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#0f1117', borderBottom: '1px solid #2a2d3a' }}>
                {['No. Struk', 'Waktu', 'Kasir', 'Tipe', 'Item', 'Pembayaran', 'Total', ''].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#6b7280', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1e2130' : 'none' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#f59e0b' }}>{t.receiptNo}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af' }}>
                    {new Date(t.date).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '12px 14px' }}>{t.cashier}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af' }}>{ORDER_LABEL[t.orderType]}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af' }}>{t.items.reduce((s, i) => s + i.qty, 0)} item</td>
                  <td style={{ padding: '12px 14px' }}>{METHOD_LABEL[t.paymentMethod]}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>{formatRupiah(t.total)}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <button onClick={() => setSelected(t)} style={{ background: '#2a2d3a', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && <ReceiptModal transaction={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: '#1a1d27', border: '1px solid #2a2d3a', color: '#fff',
  padding: '10px 14px', borderRadius: 8, fontSize: 13, outline: 'none',
  width: 220,
}

const clearBtnStyle: React.CSSProperties = {
  background: '#2a2d3a', border: 'none', color: '#9ca3af',
  padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13,
}
