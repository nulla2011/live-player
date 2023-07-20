import { build, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    importToCDN({
      modules: [
        {
          name: 'flv.js',
          var: 'flvjs',
          path: 'https://cdn.staticfile.org/flv.js/1.6.2/flv.min.js',
        },
        {
          name: 'hls.js',
          var: 'Hls',
          path: 'https://cdn.staticfile.org/hls.js/1.4.9/hls.min.js',
        },
        {
          name: 'artplayer',
          var: 'Artplayer',
          path: 'https://cdn.staticfile.org/artplayer/5.0.9/artplayer.js',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => 'assets/live-[name]-[hash][extname]',
        entryFileNames: 'assets/live-[name]-[hash].js',
        chunkFileNames: 'assets/live-[name]-[hash].js',
      },
    },
  },
});
