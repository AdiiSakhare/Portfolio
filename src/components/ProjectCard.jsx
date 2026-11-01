export default function ProjectCard({ project }) {
  return (
    <article className="project-card" style={{ '--project-accent': project.accentColor }}>
      <img
        className="project-image"
        src={project.image}
        alt={project.imageDescription}
        width="1024"
        height="640"
        loading="lazy"
        decoding="async"
      />

      <div className="project-content">
        <div className="project-text">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <ul className="project-tags" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li className={`project-tag project-tag--${tag.color}`} key={tag.label}>
              {tag.label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
