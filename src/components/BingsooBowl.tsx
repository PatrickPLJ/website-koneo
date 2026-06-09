export default function BingsooBowl() {
  return (
    <div className="bowl-stage">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <svg className="bowl-svg" viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" aria-label="Semangkuk bingsoo">
        <defs>
          <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#dbe7f4" />
          </linearGradient>
          <linearGradient id="bowl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d4684" /><stop offset="1" stopColor="#062a54" />
          </linearGradient>
        </defs>
        {/* ice mound */}
        <path d="M200 40 C120 40 70 130 60 210 C90 200 110 230 140 215 C165 245 200 225 230 245 C255 225 290 240 320 215 C345 130 280 40 200 40Z" fill="url(#ice)" />
        {/* caramel drizzle */}
        <path d="M120 200 q-6 30 8 44 q14-14 8-44Z" fill="#bf7d1a" />
        <path d="M270 198 q-6 34 8 50 q14-16 8-50Z" fill="#bf7d1a" />
        {/* blueberries */}
        <g fill="#3f6fb0">
          <path d="M185 95 q22-18 40 4 q-6 30-26 40 q-22-16-14-44Z" />
          <path d="M255 130 q18-14 32 4 q-6 24-22 30 q-16-14-10-34Z" />
        </g>
        <circle cx="150" cy="120" r="9" fill="#f0b429" />
        <circle cx="220" cy="160" r="7" fill="#8aa860" />
        {/* bowl */}
        <path d="M60 215 Q200 270 340 215 L320 300 Q200 350 80 300Z" fill="url(#bowl)" />
        <ellipse cx="200" cy="216" rx="140" ry="26" fill="#0d4684" />
        <ellipse cx="200" cy="212" rx="140" ry="24" fill="#114e90" />
        {/* foot */}
        <path d="M150 330 h100 l-14 30 h-72Z" fill="#062a54" />
      </svg>
    </div>
  )
}
