import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ── Base path:
//   • Vercel sets process.env.VERCEL = "1" automatically → use "/"
//   • GitHub Pages deploy script sets GITHUB_PAGES=true   → use "/portfolio-site/"
const isVercel      = process.env.VERCEL === "1";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const base          = isVercel || (!isGithubPages && !isVercel) ? "/" : "/portfolio-site/";

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
