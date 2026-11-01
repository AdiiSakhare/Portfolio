import { useLayoutEffect, useRef } from 'react'
import './Hero.css'
import heroBackground from '../assets/figma/hero-background.png'
import arrowIcon from '../assets/figma/icon-arrow-right.svg'
import resumeIcon from '../assets/figma/icon-resume.svg'
import { gsap, defaultEase } from '../hooks/gsapSetup'
import { scrollToSection } from '../hooks/useSmoothScroll'

export default function Hero() {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const motionPreference = gsap.matchMedia()

    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-entrance', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: defaultEase,
        stagger: 0.12,
      })
    }, heroRef)

    return () => motionPreference.revert()
  }, [])

  const handleWorkClick = (event) => {
    event.preventDefault()
    scrollToSection('work')
  }

  return (
    <section className="hero-section" ref={heroRef} aria-labelledby="hero-name">
      <img
        className="hero-background-image"
        src={heroBackground}
        alt=""
        width="1440"
        height="900"
        fetchPriority="high"
      />

      <div className="hero-text">
        <p className="hero-greeting hero-entrance">HEY THERE!!!</p>

        <h1 className="hero-name hero-entrance" id="hero-name">
          <span className="hero-name-line">I’m<span className="hero-name-comma">,</span></span>{' '}
          <span className="hero-name-line">Adinath</span>{' '}
          <span className="hero-name-line">Sakhare</span>
        </h1>

        <p className="hero-role hero-entrance">
          <span className="hero-role-line">Ui/Ux Designer &amp;</span>{' '}
          <span className="hero-role-line">Frontend Developer</span>
        </p>
      </div>

      <div className="hero-actions hero-entrance">
        <a className="hero-button hero-button--primary" href="#work" onClick={handleWorkClick}>
          <span>View My Work</span>
          <img className="hero-button-icon hero-button-icon--rotated" src={arrowIcon} alt="" width="18" height="18" />
        </a>

        {/* The resume file is not ready yet, so this button is inactive for now. */}
        <a className="hero-button hero-button--secondary" role="link" aria-disabled="true" title="Coming soon">
          <span>Get Resume</span>
          <img className="hero-button-icon" src={resumeIcon} alt="" width="18" height="18" />
        </a>
      </div>
    </section>
  )
}
