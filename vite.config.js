import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site lives at <username>.github.io/moms-recipes/ on GitHub Pages.
  base: '/moms-recipes/',
  plugins: [react()],
})
