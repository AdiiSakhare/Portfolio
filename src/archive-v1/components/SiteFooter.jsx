import './SiteFooter.css'
import { profile } from '../data/profile'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>Designed and built with React, GSAP and Lenis.</p>
    </footer>
  )
}
