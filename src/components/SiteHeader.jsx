import { useEffect, useState } from 'react'
import './SiteHeader.css'
import statusDotLarge from '../assets/figma/status-dot-large.svg'
import statusDotSmall from '../assets/figma/status-dot-small.svg'
import { scrollToSection } from '../hooks/useSmoothScroll'

const navigationLinks = [
  { label: 'Home', sectionId: 'top' },
  { label: 'Work', sectionId: 'work' },
  { label: 'About', sectionId: 'about' },
]

// Within this many pixels of the top of the page the navigation shows in full.
const TOP_OF_PAGE_TOLERANCE_PX = 2
// A finger drag must move this far before it counts as a scroll.
const TOUCH_DRAG_THRESHOLD_PX = 4
const SCROLL_DOWN_KEYS = ['ArrowDown', 'PageDown', 'End', ' ']

const getScrollPosition = () => window.scrollY || document.documentElement.scrollTop || 0

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Any downward scroll, anywhere on the page, folds the availability row away.
  // It stays folded while scrolling back up, and returns only at the very top.
  // Wheel, touch and keyboard are watched as well as the scroll event itself, so it reacts
  // the moment scrolling starts, whichever way the visitor scrolls.
  useEffect(() => {
    let previousScrollPosition = getScrollPosition()
    let touchStartY = 0

    const showFullNavigationIfAtTop = () => {
      if (getScrollPosition() <= TOP_OF_PAGE_TOLERANCE_PX) setIsScrolled(false)
    }

    const handleScroll = () => {
      const currentScrollPosition = getScrollPosition()
      if (currentScrollPosition <= TOP_OF_PAGE_TOLERANCE_PX) {
        setIsScrolled(false)
      } else if (currentScrollPosition > previousScrollPosition) {
        setIsScrolled(true)
      }
      previousScrollPosition = currentScrollPosition
    }

    const handleWheel = (event) => {
      if (event.deltaY > 0) setIsScrolled(true)
      else if (event.deltaY < 0) showFullNavigationIfAtTop()
    }

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY
    }

    const handleTouchMove = (event) => {
      // A finger moving up the screen scrolls the page down.
      if (touchStartY - event.touches[0].clientY > TOUCH_DRAG_THRESHOLD_PX) setIsScrolled(true)
    }

    const handleKeyDown = (event) => {
      if (SCROLL_DOWN_KEYS.includes(event.key)) setIsScrolled(true)
    }

    setIsScrolled(previousScrollPosition > TOP_OF_PAGE_TOLERANCE_PX)

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll, { capture: true })
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleLinkClick = (event, sectionId) => {
    event.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <header className="site-header" id="top">
      <nav
        className={`main-navigation${isScrolled ? ' main-navigation--scrolled' : ''}`}
        aria-label="Primary"
      >
        <ul className="navigation-links">
          {navigationLinks.map((link) => (
            <li key={link.sectionId}>
              <a href={`#${link.sectionId}`} onClick={(event) => handleLinkClick(event, link.sectionId)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            {/* The resume file is not ready yet, so this link is inactive for now. */}
            <a role="link" aria-disabled="true" title="Coming soon">Resume</a>
          </li>
        </ul>

        <div className="availability-drawer">
          <p className="availability-status">
            <span className="availability-content">
              <picture>
                <source media="(min-width: 1200px)" srcSet={statusDotLarge} />
                <img className="availability-dot" src={statusDotSmall} alt="" />
              </picture>
              <span>Available for Work</span>
            </span>
          </p>
        </div>
      </nav>

    </header>
  )
}
