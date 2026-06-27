import { useMemo } from 'react'
import { getTransactions, formatRupiah } from '../store'
import type { Transaction } from '../types'

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function Dashboard() {
  const txns = useMemo(() => getTransactions(), [])

  const todayTxns = useMemo(() => {
    const today = startOfDay(new Date())
    return txns.filter(t => new Date(t.date) >= today)
  }, [txns])

  const weekTxns = useMemo(() => {
    const week = new Date()
    week.setDate(week.getDate() - 7)
    return txns.filter(t => new Date(t.date) >= week)
  }, [txns])

  const todayRevenue = todayTxns.reduce((s, t) => s + t.total, 0)
  const weekRevenue = weekTxns.reduce((s, t) => s + t.total, 0)
  const totalRevenue = txns.reduce((s, t) => s + t.total, 0)

  const topItems = useMemo(() => {
    const map: Record<string, { name: string; qty: number; revenue: number }> = {}
    txns.forEach(t => {
      t.items.forEach(item => {
        const key = item.product.name + (item.variantLabel ? ` (${item.variantLabel})` : '')
        if (!map[key]) map[key] = { name: key, qty: 0, revenue: 0 }
        map[key].qty += item.qty
        map[key].revenue += (item.variantPrice ?? item.product.price) * item.qty
      })
    })
    return Object.values(map).sort((a, b) => b.qty - a.qty).slice(0, 8)
  }, [txns])

  const paymentBreakdown = useMemo(() => {
    const map: Record<string, number> = { cash: 0, qris: 0, transfer: 0 }
    txns.forEach(t => { map[t.paymentMethod] += t.total })
    return map
  }, [txns])

  const recentTxns = txns.slice(0, 5)

  return (
    <div style={{ padding: '24px', fontFamily: "'Segoe UI', system-ui, sans-serif", color: '#fff', maxWidth: 1100 }}>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Dashboard</div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Pendapatan Hari Ini', value: formatRupiah(todayRevenue), sub: `${todayTxns.length} transaksi`, color: '#f59e0b' },
          { label: 'Pendapatan Minggu Ini', value: formatRupiah(weekRevenue), sub: `${weekTxns.length} transaksi`, color: '#10b981' },
          { label: 'Total Pendapatan', value: formatRupiah(totalRevenue), sub: `${txns.length} transaksi`, color: '#6366f1' },
        ].map(c => (
          <div key={c.label} style={{ background: '#1a1d27', borderRadius: 14, padding: '20px 22px', border: '1px solid #2a2d3a' }}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Top items */}
        <div style={{ background: '#1a1d27', borderRadius: 14, padding: '20px', border: '1px solid #2a2d3a' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Produk Terlaris</div>
          {topItems.length === 0 && <div style={{ color: '#6b7280', fontSize: 13 }}>Belum ada data</div>}
          {topItems.map((item, i) => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: i < topItems.length - 1 ? '1px solid #2a2d3a' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#6b7280', fontSize: 12, width: 18 }}>#{i + 1}</span>
                <span style={{ fontSize: 13 }}>{item.name}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b' }}>{item.qty}x</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatRupiah(item.revenue)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment method + recent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#1a1d27', borderRadius: 14, padding: '20px', border: '1px solid #2a2d3a' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Metode Pembayaran</div>
            {[
              { method: 'cash', label: 'Tunai', icon: '💵' },
              { method: 'qris', label: 'QRIS', icon: '📱' },
              { method: 'transfer', label: 'Transfer', icon: '🏦' },
            ].map(m => (
              <div key={m.method} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#9ca3af' }}>{m.icon} {m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{formatRupiah(paymentBreakdown[m.method] || 0)}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#1a1d27', borderRadius: 14, padding: '20px', border: '1px solid #2a2d3a' }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Transaksi Terakhir</div>
            {recentTxns.length === 0 && <div style={{ color: '#6b7280', fontSize: 13 }}>Belum ada transaksi</div>}
            {recentTxns.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{t.receiptNo}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{new Date(t.date).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#10b981' }}>{formatRupiah(t.total)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
