import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import jsconfigPaths from "vite-jsconfig-paths";


export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  base: "/todo-list/",
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  server: {
    proxy: {
      '/api': {
        target: "http://146.190.226.226:8000/",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})