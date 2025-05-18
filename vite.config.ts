import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for deployment
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});


