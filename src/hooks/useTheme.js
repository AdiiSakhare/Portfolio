import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { playVenomTransition } from './venomTransition'

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

  /** `origin` is where the ink effect starts, in viewport pixels (the switch's centre). */
  const toggleTheme = useCallback((origin) => {
    const next = readTheme() === 'dark' ? 'light' : 'dark'

    // Must finish synchronously: the browser takes its "after" snapshot as soon as this returns.
    const applyTheme = () => {
      document.documentElement.dataset.theme = next
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next])
      flushSync(() => setTheme(next))
      try {
        sessionStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Private mode: the switch still works for this visit.
      }
    }

    playVenomTransition(origin ?? { x: window.innerWidth / 2, y: 0 }, applyTheme)
  }, [])

  return { theme, toggleTheme }
}
