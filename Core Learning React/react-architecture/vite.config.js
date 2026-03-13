import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.OPENWEATHER_API_KEY": JSON.stringify(
        env.OPENWEATHER_API_KEY
      ),
      "process.env.OPENWEATHER_API_URL": JSON.stringify(
        env.OPENWEATHER_API_URL
      ),
    },
    plugins: [react()],
    server: { allowedHosts: true, }
  }
})
