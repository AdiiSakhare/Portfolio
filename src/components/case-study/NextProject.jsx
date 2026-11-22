import { Link } from 'react-router-dom'

/** Ends a case study by pointing at the next project in the list (wraps to the first). */
export default function NextProject({ project }) {
  return (
    <section className="cs-next page-section" aria-labelledby="cs-next-heading">
      <Link className="cs-next-link" to={`/work/${project.id}`} data-reveal>
        <div className="cs-next-text">
          <p className="cs-eyebrow" id="cs-next-heading">Next project</p>
          <p className="cs-next-title">{project.title} <span aria-hidden="true">→</span></p>
        </div>
        <figure className="cs-figure cs-next-figure">
          <img src={project.tiles[0].image} alt="" loading="lazy" decoding="async" />
        </figure>
      </Link>
    </section>
  )
}
