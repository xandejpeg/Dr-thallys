import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        privacidade: 'politica-privacidade.html',
        termos: 'termos-uso.html'
      }
    }
  },
  publicDir: false
})
