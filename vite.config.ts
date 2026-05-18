import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),

    {
      name: 'admin-fallback',

      configureServer(server) {
        server.middlewares.use((req, res, next) => {

          // ONLY route requests
          if (
            req.url?.startsWith('/admin') &&
            !req.url.includes('/assets/') &&
            !req.url.includes('.js') &&
            !req.url.includes('.css') &&
            !req.url.includes('.png') &&
            !req.url.includes('.jpg') &&
            !req.url.includes('.svg')
          ) {

            const filePath = path.join(
              process.cwd(),
              'public',
              'admin',
              'index.html'
            )

            const html = fs.readFileSync(filePath, 'utf-8')

            res.setHeader('Content-Type', 'text/html')
            res.end(html)

            return
          }

          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})