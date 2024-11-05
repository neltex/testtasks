import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'], 
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
});
