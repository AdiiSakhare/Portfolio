import { useEffect } from 'react'

/**
 * On touch screens, marks bento tiles with `is-centred` while their middle is within ±10% of the
 * viewport height from the screen centre, so the hover effect plays as you scroll past.
 */
export function useCenterActiveTiles(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container || !window.matchMedia('(hover: none)').matches) return undefined

    const tiles = [...container.querySelectorAll('.bento-tile')]
    let frame = 0

    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight
      tiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2)
        tile.classList.toggle('is-centred', distance <= viewportHeight * 0.1)
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [containerRef])
}
