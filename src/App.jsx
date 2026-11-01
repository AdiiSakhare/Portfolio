import SiteHeader from './components/SiteHeader'
import Hero from './components/Hero'
import SkillsMarquee from './components/SkillsMarquee'
import Introduction from './components/Introduction'
import SelectedWork from './components/SelectedWork'
import Ethos from './components/Ethos'
import Contact from './components/Contact'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

export default function App() {
  useSmoothScroll()
  useRevealOnScroll()

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <SkillsMarquee />
        <Introduction />
        <SelectedWork />
        <Ethos />
        <Contact />
      </main>
    </>
  )
}
