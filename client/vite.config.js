import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"  // Ensure Vite outputs to "dist"
  },
  server: {
    proxy: {
      "/images": "http://localhost:5000",  // Proxy requests for images to the backend
    },
  },
});
