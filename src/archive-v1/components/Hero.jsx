import { useLayoutEffect, useRef } from 'react'
import './Hero.css'
import { gsap, defaultEase } from '../hooks/gsapSetup'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { profile } from '../data/profile'

export default function Hero() {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const motionPreference = gsap.matchMedia()

    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: defaultEase } })
      timeline
        .from('.heading-line-text', { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from('.hero-fade-in', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
    }, heroRef)

    return () => motionPreference.revert()
  }, [])

  const handleWorkClick = (event) => {
    event.preventDefault()
    scrollToSection('work')
  }

  return (
    <section className="hero-section" id="home" ref={heroRef} aria-labelledby="hero-heading">
      <div className="hero-content">
        <p className="hero-introduction hero-fade-in">{profile.name} · UI/UX Designer</p>

        <h1 className="hero-heading" id="hero-heading">
          <span className="heading-line">
            <span className="heading-line-text">Designer first,</span>
          </span>
          <span className="heading-line">
            <span className="heading-line-text heading-line-text--soft">AI-fluent.</span>
          </span>
        </h1>

        <div className="hero-details">
          <p className="hero-summary hero-fade-in">
            I design SaaS products and conversion-focused websites at Bee Logical. I use AI tools like
            Claude Code and Codex to explore and build, and my own judgment decides what ships.
          </p>

          <div className="hero-actions hero-fade-in">
            <a className="button button--solid" href="#work" onClick={handleWorkClick}>
              View selected work
            </a>
            <a className="button button--text" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>

        <p className="designer-note hero-fade-in" aria-hidden="true">
          note: the tools are fast.
          <br />
          the taste is mine.
        </p>
      </div>
    </section>
  )
}
