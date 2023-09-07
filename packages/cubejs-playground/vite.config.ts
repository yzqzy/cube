import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'build',
    target: 'es2018',
  },
  server: {
    port: 3080,
    // proxy: {
    //   '^/playground/*': 'http://localhost:4000',
    //   '^/cubejs-api/*': 'http://localhost:4000',
    // },
    proxy: {
      '^/playground/*': 'http://cube.banmahui.cn',
      '^/cubejs-api/*': 'http://cube.banmahui.cn',
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },

  define:
    mode === 'development'
      ? {
          global: {},
        }
      : undefined,
}));
