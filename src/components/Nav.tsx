import { useState } from 'react'
import MipoLogo from './MipoLogo'

const items = [
  { href: '#brands',    label: 'Our Brands' },
  { href: '#pricelist', label: 'Price List' },
  { href: '#about',     label: 'About' },
  { href: '#contact',   label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="mipo-nav">
      <div className="wrap nav-in">
        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
        <a href="#top" className="brand-mark" onClick={close}>
          <MipoLogo className="mipo-logo-svg" />
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {items.map((it) => (
            <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta" onClick={close}>Get in Touch</a>
      </div>
    </header>
  )
}
