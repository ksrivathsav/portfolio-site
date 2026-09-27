import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
