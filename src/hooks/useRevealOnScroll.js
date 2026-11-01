import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, defaultEase } from './gsapSetup'

/**
 * Fades and lifts every element marked with `data-reveal` as it scrolls into view.
 * Elements that enter together (like a row of cards) arrive one after another.
 */
export function useRevealOnScroll() {
  useLayoutEffect(() => {
    const motionPreference = gsap.matchMedia()

    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('[data-reveal]', { y: 32, opacity: 0 })

      ScrollTrigger.batch('[data-reveal]', {
        // clamp() keeps the trigger reachable for elements near the very bottom of the page,
        // such as the contact links, which could otherwise never scroll high enough to start.
        start: 'clamp(top 90%)',
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, { y: 0, opacity: 1, duration: 0.9, ease: defaultEase, stagger: 0.1 }),
      })
    })

    return () => motionPreference.revert()
  }, [])

  useLayoutEffect(() => {
    // Fonts and images change the page height after the triggers are measured,
    // so positions are recalculated once everything has settled.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
}
