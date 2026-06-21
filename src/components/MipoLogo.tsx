export default function MipoLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MIPO GROUP"
    >
      {/* M mark */}
      <g transform="translate(0,4)">
        <path
          d="M6 48 L6 8 L18 8 L28 30 L38 8 L50 8 L50 48 L40 48 L40 24 L30 44 L26 44 L16 24 L16 48 Z"
          fill="currentColor"
          rx="3"
        />
        <rect x="40" y="32" width="10" height="16" rx="8" fill="currentColor" />
      </g>
      {/* MIPO text */}
      <text
        x="62"
        y="28"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="3"
        fill="currentColor"
      >
        MIPO
      </text>
      {/* divider */}
      <rect x="62" y="33" width="52" height="1.5" fill="currentColor" opacity="0.4" />
      {/* GROUP text */}
      <text
        x="62"
        y="48"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="500"
        fontSize="12"
        letterSpacing="5"
        fill="currentColor"
        opacity="0.8"
      >
        GROUP
      </text>
    </svg>
  )
}
