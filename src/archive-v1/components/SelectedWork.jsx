import './SelectedWork.css'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function SelectedWork() {
  return (
    <section className="page-section" id="work" aria-labelledby="work-heading">
      <header className="section-header" data-reveal>
        <h2 className="section-heading" id="work-heading">Selected work</h2>
        <p className="section-subheading">Crafted with intent.</p>
      </header>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} data-reveal>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
