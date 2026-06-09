const phrases = [
  'Bingsoo Korea Pertama di Bali',
  'Lembut · Segar · Ramah Kantong',
  'Spot Paling Instagramable',
  'Buka Tiap Hari 10—22',
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
