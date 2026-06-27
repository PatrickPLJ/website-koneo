import { useState } from 'react'
import { getPin } from './store'

interface Props {
  onLogin: (cashierName: string) => void
}

export default function KasirLogin({ onLogin }: Props) {
  const [pin, setPin] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleKey(digit: string) {
    if (pin.length < 6) setPin(p => p + digit)
  }

  function handleDel() {
    setPin(p => p.slice(0, -1))
  }

  function handleLogin() {
    if (!name.trim()) { setError('Masukkan nama kasir'); return }
    if (pin === getPin()) {
      setError('')
      onLogin(name.trim())
    } else {
      setError('PIN salah, coba lagi')
      setPin('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0f1117',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        background: '#1a1d27', borderRadius: 20, padding: '40px 32px',
        width: 340, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid #2a2d3a',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🍧</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>Koneo Kasir</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Masuk untuk melanjutkan</div>
        </div>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nama kasir"
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 10,
            background: '#0f1117', border: '1px solid #2a2d3a',
            color: '#fff', fontSize: 14, marginBottom: 20,
            outline: 'none', boxSizing: 'border-box',
          }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20,
        }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: i < pin.length ? '#f59e0b' : '#2a2d3a',
              transition: 'background 0.15s',
            }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
          {['1','2','3','4','5','6','7','8','9'].map(d => (
            <button key={d} onClick={() => handleKey(d)} style={pinBtnStyle}>{d}</button>
          ))}
          <button onClick={() => handleKey('0')} style={{ ...pinBtnStyle, gridColumn: '2' }}>0</button>
          <button onClick={handleDel} style={{ ...pinBtnStyle, background: '#2a2d3a', gridColumn: '3' }}>⌫</button>
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: 13, textAlign: 'center', marginBottom: 10 }}>{error}</div>
        )}

        <button onClick={handleLogin} style={{
          width: '100%', padding: '14px', borderRadius: 10,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#fff', fontWeight: 700, fontSize: 15,
          border: 'none', cursor: 'pointer', marginTop: 4,
        }}>
          Masuk
        </button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#4b5563' }}>
          PIN default: 1234
        </div>
      </div>
    </div>
  )
}

const pinBtnStyle: React.CSSProperties = {
  padding: '14px', borderRadius: 10, background: '#0f1117',
  border: '1px solid #2a2d3a', color: '#fff', fontSize: 18,
  fontWeight: 600, cursor: 'pointer',
}
