import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Muda 'painel-escuteiros' para o nome EXATO do teu repositório no GitHub
export default defineConfig({
  plugins: [react()],
  base: '/painel-escuteiros/',
})
