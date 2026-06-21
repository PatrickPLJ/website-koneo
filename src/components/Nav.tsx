import { useState } from 'react'
import { LINKS } from '../config'

const items = [
  { href: '#menu',    label: 'Menu' },
  { href: '#voice',   label: 'About Us' },
  { href: '#goes-to', label: 'Catering' },
  { href: '#visit',   label: 'Kunjungi' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="brand-mark" onClick={close}>
          <span className="brand-logo">KONEO</span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {items.map((it) => (
            <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
          ))}
        </nav>
        <a href={LINKS.gofood} target="_blank" rel="noopener" className="btn nav-order">More Info</a>
        <button
          className="nav-toggle btn ghost"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Tutup' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
