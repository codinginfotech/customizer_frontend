import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // vite.config runs in Node, so .env must be loaded explicitly here.
  const env = loadEnv(mode, dirname, 'VITE_');
  // Where the dev server forwards /api and /uploads (see .env). The browser
  // keeps talking to this origin, so auth cookies stay first-party.
  const backend = env.VITE_BACKEND_URL || 'http://localhost:4000';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // Consume the shared package from SOURCE: Vite transpiles the TS
        // directly, so schema changes apply instantly with no stale prebundle
        // and no CJS interop in the app bundle.
        '@cpd/shared': path.resolve(dirname, 'shared/src/index.ts'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': { target: backend, changeOrigin: true },
        '/uploads': { target: backend, changeOrigin: true },
      },
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            konva: ['konva', 'react-konva'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['src/tests/setup.ts'],
      globals: true,
    },
  } as never;
});
