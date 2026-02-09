import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        privacidade: 'politica-privacidade.html',
        termos: 'termos-uso.html'
      }
    },
    copyPublicDir: true
  },
  publicDir: 'assets'
})
