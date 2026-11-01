import { useEffect, useState } from 'react'
import './Navbar.css'
import { scrollToSection } from '../hooks/useSmoothScroll'
import { useActiveSection } from '../hooks/useActiveSection'

const navigationLinks = [
  { label: 'Home', sectionId: 'home' },
  { label: 'Work', sectionId: 'work' },
  { label: 'About', sectionId: 'about' },
]

const sectionIds = navigationLinks.map((link) => link.sectionId)

export default function Navbar() {
  const activeSectionId = useActiveSection(sectionIds)
  const [isCompact, setIsCompact] = useState(false)

  // Once the visitor scrolls, the status row folds away so the bar covers less content.
  useEffect(() => {
    const updateCompactState = () => setIsCompact(window.scrollY > 80)
    updateCompactState()
    window.addEventListener('scroll', updateCompactState, { passive: true })
    return () => window.removeEventListener('scroll', updateCompactState)
  }, [])

  const handleLinkClick = (event, sectionId) => {
    event.preventDefault()
    scrollToSection(sectionId)
  }

  return (
    <header className="site-header">
      <nav
        className={`main-navigation${isCompact ? ' main-navigation--compact' : ''}`}
        aria-label="Primary"
      >
        <ul className="navigation-links">
          {navigationLinks.map((link) => (
            <li key={link.sectionId}>
              <a
                className="navigation-link"
                href={`#${link.sectionId}`}
                aria-current={activeSectionId === link.sectionId ? 'true' : undefined}
                onClick={(event) => handleLinkClick(event, link.sectionId)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            {/* The resume file is not ready yet, so the link is disabled for now. */}
            <a className="navigation-link" aria-disabled="true" title="Coming soon">
              Resume
            </a>
          </li>
        </ul>

        <div className="availability-drawer">
          <p className="availability-status">
            <span className="availability-dot" aria-hidden="true" />
            Available for Work
          </p>
        </div>
      </nav>
    </header>
  )
}
