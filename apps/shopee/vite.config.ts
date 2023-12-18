// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './src/setupTests.ts',
    setupFiles: path.resolve(__dirname, './vite.setup.js'),
    deps: {
      inline: ['vitest-canvas-mock']
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    }
  },
  server: { hmr: true, port: 3000 },
  plugins: [react(), viteCompression(), visualizer()],

  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo': path.resolve(__dirname, '../../packages')
    }
  }
})
