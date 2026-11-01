import './SkillsMarquee.css'
import iconA from '../assets/figma/marquee-icon-a.svg'
import iconB from '../assets/figma/marquee-icon-b.svg'
import iconC from '../assets/figma/marquee-icon-c.svg'
import iconD from '../assets/figma/marquee-icon-d.svg'
import iconSmall from '../assets/figma/marquee-icon-small.svg'
import { skills } from '../data/profile'

const largeIcons = { a: iconA, b: iconB, c: iconC, d: iconD }

function SkillsGroup({ isDuplicate = false }) {
  return (
    <ul className="skills-group" aria-hidden={isDuplicate || undefined}>
      {skills.map((skill) => (
        <li className="skill-item" key={skill.name}>
          <picture>
            <source media="(min-width: 1200px)" srcSet={largeIcons[skill.icon]} />
            <img className="skill-icon" src={iconSmall} alt="" />
          </picture>
          <span className="skill-name">{skill.name}</span>
        </li>
      ))}
    </ul>
  )
}

/** A black strip of skills that scrolls sideways forever. The group is repeated for a seamless loop. */
export default function SkillsMarquee() {
  return (
    <section className="skills-marquee" aria-label="Skills">
      <div className="skills-track">
        <SkillsGroup />
        <SkillsGroup isDuplicate />
      </div>
    </section>
  )
}
