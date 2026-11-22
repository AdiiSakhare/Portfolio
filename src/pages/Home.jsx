import Hero from '../components/Hero'
import SkillsMarquee from '../components/SkillsMarquee'
import Introduction from '../components/Introduction'
import SelectedWork from '../components/SelectedWork'
import Ethos from '../components/Ethos'
import Contact from '../components/Contact'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Home() {
  useRevealOnScroll()

  return (
    <main id="main-content">
      <Hero />
      <SkillsMarquee />
      <Introduction />
      <SelectedWork />
      <Ethos />
      <Contact />
    </main>
  )
}
