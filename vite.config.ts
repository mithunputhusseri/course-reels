import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production: https://mithunputhusseri.github.io/course-reels/
// Local: http://localhost:5173/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/course-reels/' : '/',
}))
