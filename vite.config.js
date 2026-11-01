import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative, so the build works on GitHub Pages
// whatever the repository name is.
export default defineConfig({
  base: './',
  plugins: [react()],
})
