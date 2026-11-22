import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Case-study pages live at real URLs (/work/project-one), so asset paths must be absolute.
// On GitHub Pages the site is served from /Portfolio/; the dev server stays at the root.
// If the site moves to a custom domain, change the build base to '/' (and 404.html's
// pathSegmentsToKeep to 0).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Portfolio/' : '/',
  plugins: [react()],
}))
