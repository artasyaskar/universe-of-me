/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@scenes': '/src/scenes',
      '@pages': '/src/pages',
      '@services': '/src/services',
    },
  },
});
