import './DesignProcess.css'
import RefinementSlider from './RefinementSlider'
import { designProcess } from '../data/profile'

export default function DesignProcess() {
  return (
    <section className="page-section" id="process" aria-labelledby="process-heading">
      <header className="section-header" data-reveal>
        <h2 className="section-heading" id="process-heading">How I work</h2>
        <p className="section-subheading">AI speeds up the exploring. Judgment decides the result.</p>
      </header>

      <ol className="process-steps">
        {designProcess.map((step, index) => (
          <li className="process-step" key={step.title} data-reveal>
            <span className="process-step-number">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-description">{step.description}</p>
          </li>
        ))}
      </ol>

      <RefinementSlider />
    </section>
  )
}
