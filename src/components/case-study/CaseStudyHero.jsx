import { Link } from 'react-router-dom'
import { tools } from '../../data/projects'

/** Top of a case study: category, headline, intro, key numbers, four sticky notes and the lead image. */
export default function CaseStudyHero({ project, study }) {
  const heroImage = study.heroImage ?? project.tiles[0].image

  return (
    <header className="cs-hero" id="context" aria-labelledby="cs-title">
      {/* Phones and tablets have no rail, so the back link lives here. */}
      <Link className="cs-back cs-back--inline" to="/" state={{ scrollTo: project.id }}>
        <span aria-hidden="true">←</span> Back to work
      </Link>

      <div className="cs-hero-top" data-reveal>
        <div className="cs-hero-tags">
          <span className="cs-category">{study.category}</span>
          <ul className="cs-hero-tools" aria-label="Tools used">
            {project.toolIds.map((id) => (
              <li key={id}>
                <img src={tools[id].logo} alt={tools[id].label} title={tools[id].label} />
              </li>
            ))}
          </ul>
        </div>
        <h1 className="cs-title" id="cs-title">{study.headline}</h1>
        <p className="cs-project-name">{project.title}</p>
        <p className="cs-summary">{study.summary}</p>
      </div>

      {study.stats.length > 0 && (
        <dl className="cs-stats" data-reveal>
          {study.stats.map((stat, index) => (
            <div className={`cs-stat${index === 0 ? ' cs-stat--lead' : ''}`} key={`${stat.label}-${index}`}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Sticky notes echo the home page's design canvas. Each tilts a little differently. */}
      <ul className="cs-notes" data-reveal>
        {study.notes.map((note) => (
          <li className="cs-note" key={note.label}>
            <p className="cs-note-label">{note.label}</p>
            <p className="cs-note-value">{note.value}</p>
          </li>
        ))}
      </ul>

      <figure className="cs-figure cs-hero-figure" data-reveal>
        <img src={heroImage} alt={`${project.title} preview`} decoding="async" fetchPriority="high" />
      </figure>
    </header>
  )
}
