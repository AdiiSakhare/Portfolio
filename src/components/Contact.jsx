import './Contact.css'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section className="contact-section page-section" id="contact" aria-labelledby="contact-heading">
      <h2 className="contact-title" id="contact-heading" data-reveal>
        <span className="contact-title-line">Don’t be a</span>

        <span className="stranger-sticker">
          <span className="stranger-sticker-frame">
            <span className="stranger-sticker-label">Stranger</span>
          </span>
        </span>

        <span className="contact-title-line">
          Let’s <span className="contact-word-desktop">talk</span>
          <span className="contact-word-compact">chat</span>!
        </span>
      </h2>

      {/* Behance and Dribbble addresses are not set yet, so those two links are inactive. */}
      <ul className="contact-links" data-reveal>
        <li><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">linkedin</a></li>
        <li><a role="link" aria-disabled="true" title="Coming soon">Behance</a></li>
        <li><a role="link" aria-disabled="true" title="Coming soon">Dribbble</a></li>
        <li><a href={`mailto:${profile.email}`}>Email</a></li>
      </ul>
    </section>
  )
}
