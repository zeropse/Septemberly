import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src')
      }
    },
    publicDir: resolve('src/renderer/public'),
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.(mp3|wav|ogg|mp4|webm|mov)$/i.test(assetInfo.name)) {
              return `assets/media/[name].[ext]`
            }
            if (/\.(png|jpe?g|gif|svg|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name].[ext]`
            }
            return `assets/[name].[ext]`
          }
        }
      }
    }
  }
})
