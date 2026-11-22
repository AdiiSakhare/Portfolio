import { Link } from 'react-router-dom'
import { scrollToSection } from '../../hooks/useSmoothScroll'
import { useActiveSection } from '../../hooks/useActiveSection'

/** Sticky left rail (desktop): back link plus the sections, with the one being read highlighted. */
export default function CaseStudyRail({ projectId, items }) {
  const active = useActiveSection(items.map((item) => item.id))

  const jump = (event, id) => {
    event.preventDefault()
    scrollToSection(id, { offset: -100 })
  }

  return (
    <aside className="cs-rail">
      <Link className="cs-back" to="/" state={{ scrollTo: projectId }}>
        <span aria-hidden="true">←</span> Back to work
      </Link>
      <nav aria-label="On this page">
        <ul className="cs-rail-list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={`cs-rail-link${active === item.id ? ' is-active' : ''}`}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={(event) => jump(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
