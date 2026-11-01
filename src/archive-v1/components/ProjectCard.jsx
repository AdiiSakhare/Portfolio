export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <figure className="project-preview">
        <img
          className="project-preview-image"
          src={project.image}
          alt={project.imageDescription}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="project-details">
        <div className="project-title-row">
          <h3 className="project-title">{project.title}</h3>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>

        <p className="project-description">{project.description}</p>

        <ul className="project-tags" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag-chip">{tag}</li>
          ))}
        </ul>

        <p className="project-case-study-status">Case study coming soon</p>
      </div>
    </article>
  )
}
