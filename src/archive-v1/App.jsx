import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'
import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import DesignProcess from './components/DesignProcess'
import About from './components/About'
import Contact from './components/Contact'
import SiteFooter from './components/SiteFooter'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

export default function App() {
  useSmoothScroll()
  useRevealOnScroll()

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <ThemeToggle />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <DesignProcess />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
