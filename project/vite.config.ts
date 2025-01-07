import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Ensure modern JS output
    rollupOptions: {
      output: {
        format: 'es', // Ensure the output is in the ES module format
      },
    },
  },
});
