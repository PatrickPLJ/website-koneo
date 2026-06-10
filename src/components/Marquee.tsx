const phrases = [
  'First Bingsoo Bar in Bali',
  'Open Daily 10.00–22.00',
  'Closed Order 21.30',
  'Jl. Nangka Utara 189 Denpasar',
]

export default function Marquee() {
  const loop = [...phrases, ...phrases]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </div>
    </div>
  )
}
