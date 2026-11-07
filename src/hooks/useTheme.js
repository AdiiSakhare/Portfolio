import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const THEME_COLORS = { light: '#ffffff', dark: '#0e1117' }

// index.html sets data-theme before first paint, so this only reads it back.
const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

/** Light/dark theme. Light is always the default; a switch is remembered for this visit only (sessionStorage). */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    // A short colour cross-fade, only while switching, so normal hover/scroll transitions are untouched.
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 400)

    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        sessionStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Private mode: the switch still works for this visit.
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
