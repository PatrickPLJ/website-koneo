import { useState } from 'react'
import KasirLogin from './KasirLogin'
import POS from './pages/POS'
import History from './pages/History'
import Dashboard from './pages/Dashboard'
import { setCashierName } from './store'
import type { KasirPage } from './types'

const NAV_ITEMS: { id: KasirPage; icon: string; label: string }[] = [
  { id: 'pos', icon: '🛒', label: 'Kasir' },
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'history', icon: '📋', label: 'Riwayat' },
]

export default function KasirApp() {
  const [cashier, setCashier] = useState<string | null>(null)
  const [page, setPage] = useState<KasirPage>('pos')

  function handleLogin(name: string) {
    setCashierName(name)
    setCashier(name)
  }

  function handleLogout() {
    setCashier(null)
  }

  if (!cashier) return <KasirLogin onLogin={handleLogin} />

  return (
    <div style={{
      minHeight: '100vh', background: '#0f1117',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        height: 56, background: '#1a1d27', borderBottom: '1px solid #2a2d3a',
        display: 'flex', alignItems: 'center', padding: '0 20px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <span style={{ fontSize: 22 }}>🍧</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Koneo Kasir</span>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
              background: page === n.id ? '#f59e0b' : 'transparent',
              color: page === n.id ? '#0f1117' : '#9ca3af',
              fontWeight: page === n.id ? 700 : 400,
            }}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>

        {/* Cashier */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>👤 {cashier}</span>
          <button onClick={handleLogout} style={{
            padding: '6px 12px', borderRadius: 8, background: '#2a2d3a',
            border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 12,
          }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {page === 'pos' && <POS />}
        {page === 'dashboard' && <div style={{ flex: 1, overflowY: 'auto' }}><Dashboard /></div>}
        {page === 'history' && <div style={{ flex: 1, overflowY: 'auto' }}><History /></div>}
      </div>
    </div>
  )
}
