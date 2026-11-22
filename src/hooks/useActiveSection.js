import { useEffect, useState } from 'react'

/** Returns the id of the section currently under the reading line (about a third down the viewport). */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.33
      let current = elements[0].id
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= line) current = element.id
      }
      setActive(current)
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
    // `key` stands in for the ids array, which is a new object every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
