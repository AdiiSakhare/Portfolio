import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Home from './pages/Home'
import CaseStudyPage from './pages/CaseStudyPage'
import { scrollToSection, scrollToTop, useSmoothScroll } from './hooks/useSmoothScroll'

/**
 * A new page opens at the top. Arriving at the home page with `state.scrollTo` (from the navbar, or
 * from a case study's "All work" link) jumps to that section instead.
 */
function useScrollOnNavigation() {
  const { pathname, state } = useLocation()
  const target = state?.scrollTo

  useEffect(() => {
    if (target) scrollToSection(target, { immediate: true, offset: -100 })
    else scrollToTop()
  }, [pathname, target])
}

export default function App() {
  useSmoothScroll()
  useScrollOnNavigation()

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:projectId" element={<CaseStudyPage />} />
        <Route path="*" element={<CaseStudyPage />} />
      </Routes>
    </>
  )
}
