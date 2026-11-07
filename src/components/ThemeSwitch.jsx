import { useTheme } from '../hooks/useTheme'

/** An easter egg on the hero canvas: a draggable pill switch that flips the whole site between light and dark. */
export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="canvas-item canvas-item--theme">
      <div className="canvas-drift" data-depth="0.7">
        <div className="theme-piece">
          <button
            className="theme-switch"
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Dark mode"
            onClick={toggleTheme}
          >
            {/* Stars only show on the night track. */}
            <svg className="theme-switch-stars" viewBox="0 0 40 28" aria-hidden="true">
              <path d="M10 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
              <path d="M24 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
              <circle cx="31" cy="6" r="1" />
            </svg>

            <span className="theme-switch-thumb">
              <svg className="theme-icon theme-icon--sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
              </svg>
              <svg className="theme-icon theme-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
