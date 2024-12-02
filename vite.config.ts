import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    host: '0.0.0.0',
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
