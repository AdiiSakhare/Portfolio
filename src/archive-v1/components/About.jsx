import './About.css'
import { experience, toolkit } from '../data/profile'

export default function About() {
  return (
    <section className="page-section" id="about" aria-labelledby="about-heading">
      <div className="about-layout">
        <div className="about-introduction" data-reveal>
          <h2 className="section-heading" id="about-heading">About</h2>
          <p className="about-text">
            I'm Adinath, also known as Adiii. I've been designing digital products for over a year, and
            my work now sits between design and code. I understand HTML, CSS, JavaScript, React
            fundamentals and Git, which helps me work closely with developers and explain design
            decisions clearly.
          </p>

          <h3 className="about-subheading">Tools</h3>
          <ul className="toolkit-list">
            {toolkit.map((tool) => (
              <li className="tag-chip" key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        <div className="experience" data-reveal>
          <h3 className="about-subheading">Experience</h3>
          <ol className="experience-list">
            {experience.map((job) => (
              <li className="experience-item" key={job.id}>
                <div className="experience-heading">
                  <h4 className="experience-role">{job.role}</h4>
                  <span className="experience-period">{job.period}</span>
                </div>
                <p className="experience-company">{job.company}</p>
                <p className="experience-summary">{job.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
