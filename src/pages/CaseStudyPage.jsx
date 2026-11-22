import { Link, useParams } from 'react-router-dom'
import '../components/case-study/CaseStudy.css'
import CaseStudyHero from '../components/case-study/CaseStudyHero'
import CaseStudyRail from '../components/case-study/CaseStudyRail'
import NextProject from '../components/case-study/NextProject'
import { blocksByType } from '../components/case-study/CaseStudyBlocks'
import Contact from '../components/Contact'
import { projects } from '../data/projects'
import { getCaseStudy } from '../data/caseStudies'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function CaseStudyPage() {
  const { projectId } = useParams()
  const index = projects.findIndex((project) => project.id === projectId)

  if (index === -1) return <NotFound />

  const project = projects[index]
  const study = getCaseStudy(project)
  const nextProject = projects[(index + 1) % projects.length]

  // key remounts everything per project, so scroll-reveal is re-armed when going project to project.
  return (
    <CaseStudyContent key={project.id} project={project} study={study} nextProject={nextProject} />
  )
}

function CaseStudyContent({ project, study, nextProject }) {
  useRevealOnScroll()
  const railItems = [
    { id: 'context', label: 'Context' },
    ...study.sections.map((section) => ({ id: section.id, label: section.nav })),
  ]

  return (
    <main id="main-content" className="case-study">
      <div className="cs-layout page-section">
        <CaseStudyRail projectId={project.id} items={railItems} />
        <div className="cs-main">
          <CaseStudyHero project={project} study={study} />
          {study.sections.map((section) => {
            const Block = blocksByType[section.type]
            return Block ? <Block key={section.id} section={section} /> : null
          })}
        </div>
      </div>
      <NextProject project={nextProject} />
      <Contact />
    </main>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="case-study case-study--empty page-section">
      <h1 className="cs-title">Case study not found</h1>
      <p className="cs-summary">That project doesn’t exist (yet).</p>
      <Link className="cs-back" to="/"><span aria-hidden="true">←</span> Back to all work</Link>
    </main>
  )
}
