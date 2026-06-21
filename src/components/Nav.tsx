import { useState } from 'react'
import { LINKS } from '../config'
import { menuImgUrl } from '../utils/imgUrl'

const items = [
  { href: '#menu',    label: 'Menu' },
  { href: '#voice',   label: 'About Us' },
  { href: '#goes-to', label: 'Catering' },
  { href: '#visit',   label: 'Visit Us' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#top" className="brand-mark" onClick={close}>
          <img src={menuImgUrl('/logo-text-v2.png')} alt="Koneo" className="brand-logo-img" />
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {items.map((it) => (
            <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
          ))}
        </nav>
        <button
          className="nav-toggle btn ghost"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>
    </header>
  )
}
