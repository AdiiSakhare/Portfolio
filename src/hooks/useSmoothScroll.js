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

/**
 * Scrolls to a section by id, smoothly through Lenis when it is running.
 * `immediate` jumps without animating (used when arriving from another page); `offset` leaves room for the sticky header.
 */
export function scrollToSection(sectionId, { immediate = false, offset = 0 } = {}) {
  const section = document.getElementById(sectionId)
  if (!section) return

  if (smoothScroller) {
    smoothScroller.scrollTo(section, { duration: 1.2, immediate, offset })
  } else {
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + offset, behavior: 'auto' })
  }
}

/** Jumps to the top of the page, used when a new page opens. */
export function scrollToTop() {
  if (smoothScroller) smoothScroller.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
