export default function KoneoLogo() {
  const navy = '#1a4e8c'
  return (
    <div className="koneo-logo-wrap">
      <svg viewBox="0 0 300 410" xmlns="http://www.w3.org/2000/svg" aria-label="Koneo mascot logo" className="koneo-logo-svg">

        {/* ── HAIR DOME (navy silhouette) ── */}
        <ellipse cx="150" cy="112" rx="118" ry="108" fill={navy} />
        {/* Side hair panels flanking the face */}
        <rect x="32" y="112" width="236" height="80" fill={navy} />

        {/* ── FRINGE — white horizontal band ── */}
        <rect x="46" y="147" width="208" height="30" fill="white" />

        {/* ── FACE (white oval) ── */}
        <ellipse cx="150" cy="213" rx="80" ry="70" fill="white" />

        {/* ── CLOSED EYES ── */}
        <path d="M108,198 Q122,189 136,198" stroke={navy} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M164,198 Q178,189 192,198" stroke={navy} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* ── NOSE (tiny dot) ── */}
        <ellipse cx="150" cy="218" rx="3.5" ry="2.5" fill={navy} opacity="0.35" />

        {/* ── SMILE ── */}
        <path d="M134,228 Q150,239 166,228" stroke={navy} strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* ── BODY (wide rounded trapezoid) ── */}
        <path d="M65,262 Q58,300 42,330 L258,330 Q242,300 235,262 Z" fill={navy} />
        <ellipse cx="150" cy="262" rx="90" ry="20" fill={navy} />

        {/* ── BINGSOO CUP (held up near face) ── */}
        {/* Big ice mound dome */}
        <ellipse cx="150" cy="262" rx="30" ry="28" fill="white" />
        {/* Cup body */}
        <path d="M122,278 Q124,315 134,320 L166,320 Q176,315 178,278 Z" fill="white" />
        {/* Cup bottom rounded */}
        <ellipse cx="150" cy="320" rx="16" ry="7" fill="white" />
        {/* Cup horizontal lines */}
        <path d="M126,287 Q150,279 174,287" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M124,297 Q150,289 176,297" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* ── HANDS (finger bumps cupped) ── */}
        {/* Left hand fingers */}
        <ellipse cx="96"  cy="325" rx="11" ry="9" fill="white" />
        <ellipse cx="113" cy="330" rx="11" ry="9" fill="white" />
        <ellipse cx="131" cy="332" rx="11" ry="9" fill="white" />
        {/* Right hand fingers */}
        <ellipse cx="204" cy="325" rx="11" ry="9" fill="white" />
        <ellipse cx="187" cy="330" rx="11" ry="9" fill="white" />
        <ellipse cx="169" cy="332" rx="11" ry="9" fill="white" />

        {/* ── KONEO TEXT ── */}
        <text
          x="150" y="388"
          textAnchor="middle"
          fontFamily="Fredoka, 'Fredoka One', 'Plus Jakarta Sans', sans-serif"
          fontSize="46"
          fontWeight="600"
          fill={navy}
          letterSpacing="4"
        >KONEO</text>
      </svg>
    </div>
  )
}
