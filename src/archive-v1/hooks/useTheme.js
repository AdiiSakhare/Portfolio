import { useEffect, useState } from 'react'

/** Light/dark theme. The initial value is set in index.html before first paint. */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      // Storage can be blocked (private mode); the theme still works for this visit.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  return { theme, toggleTheme }
}
