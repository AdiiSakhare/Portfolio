import './SelectedWork.css'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function SelectedWork() {
  return (
    <section className="selected-work-section page-section" id="work" aria-labelledby="work-heading">
      <header className="selected-work-header" data-reveal>
        <h2 className="selected-work-heading" id="work-heading">Selected Work</h2>
        <p className="selected-work-subheading">Crafted With Intent 👈</p>
      </header>

      <ul className="project-list">
        {projects.map((project) => (
          <li className="project-list-item" key={project.id} data-reveal>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
