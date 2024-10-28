import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'; // 플러그인 import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],  // tsconfigPaths 플러그인 적용
})
