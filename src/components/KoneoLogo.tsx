export default function KoneoLogo() {
  return (
    <div className="koneo-logo-wrap">
      <svg viewBox="0 0 320 370" xmlns="http://www.w3.org/2000/svg" aria-label="Koneo Logo" className="koneo-logo-svg">
        {/* ── HAIR / HEAD SILHOUETTE ── */}
        {/* Rounded dome top */}
        <path
          d="M160 18
             C100 18 58 58 52 115
             C48 148 52 175 60 198
             C64 208 68 216 72 222
             L72 268
             C72 278 78 285 88 288
             L232 288
             C242 285 248 278 248 268
             L248 222
             C252 216 256 208 260 198
             C268 175 272 148 268 115
             C262 58 220 18 160 18Z"
          fill="#0d4080"
        />
        {/* ── FACE ── */}
        <ellipse cx="160" cy="185" rx="72" ry="80" fill="#f5ede3"/>
        {/* ── FRINGE (straight across) ── */}
        <rect x="88" y="100" width="144" height="38" rx="4" fill="#0d4080"/>
        {/* ── LEFT EAR ── */}
        <ellipse cx="88" cy="192" rx="12" ry="16" fill="#f5ede3"/>
        {/* ── RIGHT EAR ── */}
        <ellipse cx="232" cy="192" rx="12" ry="16" fill="#f5ede3"/>
        {/* ── LEFT EYE (closed arch) ── */}
        <path d="M136 178 Q144 170 152 178" stroke="#0d4080" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* ── RIGHT EYE (closed arch) ── */}
        <path d="M168 178 Q176 170 184 178" stroke="#0d4080" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* ── SMILE ── */}
        <path d="M152 200 Q160 207 168 200" stroke="#0d4080" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* ── ARMS / HANDS holding bingsoo cup ── */}
        {/* Left arm */}
        <path d="M100 255 C88 255 76 262 72 270 L80 275 C84 268 92 265 100 265Z" fill="#0d4080"/>
        {/* Right arm */}
        <path d="M220 255 C232 255 244 262 248 270 L240 275 C236 268 228 265 220 265Z" fill="#0d4080"/>
        {/* Left hand (fist) */}
        <rect x="110" y="253" width="40" height="30" rx="12" fill="#f5ede3"/>
        {/* finger lines left */}
        <line x1="122" y1="253" x2="122" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>
        <line x1="134" y1="253" x2="134" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>
        <line x1="146" y1="253" x2="146" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>
        {/* Right hand (fist) */}
        <rect x="170" y="253" width="40" height="30" rx="12" fill="#f5ede3"/>
        {/* finger lines right */}
        <line x1="182" y1="253" x2="182" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>
        <line x1="194" y1="253" x2="194" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>
        <line x1="206" y1="253" x2="206" y2="260" stroke="#e8d8c8" strokeWidth="1.5"/>

        {/* ── BINGSOO CUP (held up, slightly overlapping lower face) ── */}
        {/* Cup body */}
        <path d="M148 220 L148 254 Q160 260 172 254 L172 220 Z" fill="white"/>
        {/* Cup bottom dome */}
        <ellipse cx="160" cy="254" rx="12" ry="6" fill="white"/>
        {/* Small ice mound on top */}
        <ellipse cx="160" cy="220" rx="10" ry="7" fill="white"/>
        {/* Cup divider line */}
        <line x1="148" y1="238" x2="172" y2="238" stroke="#d0cfc8" strokeWidth="1"/>
        {/* Cup outline */}
        <path d="M148 220 L148 254 Q160 260 172 254 L172 220 Z" fill="none" stroke="#c8c0b0" strokeWidth="1"/>

        {/* ── KONEO TEXT ── */}
        <text
          x="160" y="338"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          fontSize="38"
          fontWeight="800"
          fill="#0d4080"
          letterSpacing="8"
        >KONEO</text>
      </svg>
    </div>
  )
}
