import { Link } from 'react-router-dom'
import { tools } from '../data/projects'

// Grid area names are defined per layout in SelectedWork.css.
const TILE_AREAS = ['a', 'b', 'c', 'd', 'e']

/** One project: a bento grid of separate tiles, then the title and description with the tools used. */
export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {/* The picture and the title both open the case study; the picture link is hidden from keyboards and screen readers so the title link is the single stop. */}
      <Link className="project-bento-link" to={`/work/${project.id}`} tabIndex={-1} aria-hidden="true">
      <ul className={`bento bento--${project.layout}`} aria-label={`${project.title} screens`}>
        {project.tiles.map((tile, index) => (
          <li
            className={`bento-tile bento-tile--${tile.hover}`}
            style={{ '--tile-area': TILE_AREAS[index] }}
            key={`${project.id}-${index}`}
          >
            <img
              className="bento-image"
              src={tile.image}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
      </Link>

      <div className="project-info">
        <div className="project-text">
          <h3 className="project-title">
            <Link className="project-title-link" to={`/work/${project.id}`}>{project.title}</Link>
          </h3>
          <p className="project-description">{project.description}</p>
          <Link className="project-view-link" to={`/work/${project.id}`}>
            View case study <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="project-tools-list" aria-label="Tools used">
          {project.toolIds.map((id) => (
            <li key={id}>
              <img className="project-tool-logo" src={tools[id].logo} alt={tools[id].label} title={tools[id].label} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
