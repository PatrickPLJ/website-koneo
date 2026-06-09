import { useEffect } from 'react'

/**
 * Mengamati semua elemen ber-class `.reveal` lalu menambahkan `.in`
 * saat masuk viewport (animasi muncul bertahap).
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 60}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}
