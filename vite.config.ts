import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      viteOptimizeDeps: true,
      dirs: ['@/containers', '@/components', '@/utils', '@/store', '@/hooks'],
      dts: '@/auto-imports.d.ts',
    }),
  ],
  server: {
    port: 3000,
  },
})
