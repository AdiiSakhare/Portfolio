import { useRef } from 'react'
import './SelectedWork.css'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useCenterActiveTiles } from '../hooks/useCenterActiveTiles'

export default function SelectedWork() {
  const sectionRef = useRef(null)
  useCenterActiveTiles(sectionRef)

  return (
    <section ref={sectionRef} className="selected-work-section page-section" id="work" aria-labelledby="work-heading">
      <header className="selected-work-header" data-reveal>
        <h2 className="selected-work-heading" id="work-heading">Selected Work</h2>
        <p className="selected-work-subheading">Crafted With Intent 👈</p>
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
