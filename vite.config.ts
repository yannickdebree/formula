import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  server: { port: 8080 },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});
