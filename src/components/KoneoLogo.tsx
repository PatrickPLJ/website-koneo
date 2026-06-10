export default function KoneoLogo() {
  return (
    <div className="koneo-logo-wrap">
      <svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg" aria-label="Koneo Logo" className="koneo-logo-svg">
        {/* hair / head silhouette */}
        <path d="M200 30 C120 30 70 80 68 155 C66 200 72 230 80 252 L80 300 C80 320 90 335 110 342 L120 346 L120 380 L280 380 L280 346 L290 342 C310 335 320 320 320 300 L320 252 C328 230 334 200 332 155 C330 80 280 30 200 30Z" fill="#093a72"/>
        {/* face area */}
        <ellipse cx="200" cy="220" rx="78" ry="88" fill="#f0e8dc"/>
        {/* left ear */}
        <ellipse cx="122" cy="220" rx="14" ry="18" fill="#f0e8dc"/>
        {/* right ear */}
        <ellipse cx="278" cy="220" rx="14" ry="18" fill="#f0e8dc"/>
        {/* left eye closed */}
        <path d="M164 205 Q172 198 180 205" stroke="#093a72" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* right eye closed */}
        <path d="M220 205 Q228 198 236 205" stroke="#093a72" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* small smile */}
        <path d="M192 228 Q200 235 208 228" stroke="#093a72" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* body / shoulders */}
        <path d="M80 300 C80 320 90 335 110 342 L120 346 L120 380 L280 380 L280 346 L290 342 C310 335 320 320 320 300 L300 290 C270 308 230 318 200 318 C170 318 130 308 100 290 Z" fill="#093a72"/>
        {/* bingsoo container held up */}
        {/* hands */}
        <ellipse cx="167" cy="282" rx="22" ry="13" fill="#f0e8dc"/>
        <ellipse cx="233" cy="282" rx="22" ry="13" fill="#f0e8dc"/>
        {/* fingers left */}
        <ellipse cx="149" cy="276" rx="7" ry="5" fill="#f0e8dc"/>
        <ellipse cx="148" cy="288" rx="7" ry="5" fill="#f0e8dc"/>
        {/* fingers right */}
        <ellipse cx="251" cy="276" rx="7" ry="5" fill="#f0e8dc"/>
        <ellipse cx="251" cy="288" rx="7" ry="5" fill="#f0e8dc"/>
        {/* bingsoo cup body */}
        <path d="M182 240 L182 278 Q200 285 218 278 L218 240 Z" fill="white"/>
        {/* bingsoo cup bottom dome */}
        <ellipse cx="200" cy="278" rx="18" ry="8" fill="white"/>
        {/* bingsoo mound on top */}
        <ellipse cx="200" cy="240" rx="14" ry="10" fill="white"/>
        {/* cup outline */}
        <path d="M182 240 L182 278 Q200 285 218 278 L218 240 Z" fill="none" stroke="#093a72" strokeWidth="1.5"/>
        {/* KONEO text */}
        <text x="200" y="420" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="42" fontWeight="800" fill="#093a72" letterSpacing="6">KONEO</text>
      </svg>
    </div>
  )
}
