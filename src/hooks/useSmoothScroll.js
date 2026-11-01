import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsapSetup'

let smoothScroller = null

/** Starts Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync with it. */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    smoothScroller = new Lenis()
    smoothScroller.on('scroll', ScrollTrigger.update)

    const updateOnEachFrame = (time) => smoothScroller.raf(time * 1000)
    gsap.ticker.add(updateOnEachFrame)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateOnEachFrame)
      smoothScroller.destroy()
      smoothScroller = null
    }
  }, [])
}

/** Scrolls to a section by id, smoothly through Lenis when it is running. */
export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (!section) return

  if (smoothScroller) {
    smoothScroller.scrollTo(section, { duration: 1.2 })
  } else {
    section.scrollIntoView({ behavior: 'auto' })
  }
}
