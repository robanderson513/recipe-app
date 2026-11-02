import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/ui/form', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:3000'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  }
});
