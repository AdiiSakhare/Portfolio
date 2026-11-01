import './Contact.css'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section className="page-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-content" data-reveal>
        <h2 className="contact-heading" id="contact-heading">
          Let's build something worth using.
        </h2>

        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <ul className="contact-links">
          <li>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
