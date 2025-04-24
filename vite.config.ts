import devServer from '@hono/vite-dev-server';
import tailwindcss from '@tailwindcss/vite';
import { builtinModules } from 'module';
import path from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  const bundle = mode === 'bundle';
  const server = mode === 'server';

  return {
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    plugins: [
      tailwindcss(),
      // Apply devServer plugin only in dev mode
      ...(mode === 'development'
        ? [devServer({ entry: './src/index.tsx', injectClientScript: false })]
        : []),
    ],

    build: bundle
      ? {
          outDir: 'public',
          emptyOutDir: false,
          rollupOptions: {
            input: ['./src/web/bundle.ts', './src/web/style.css'],
            output: {
              entryFileNames: 'static/bundle.js',
              assetFileNames: 'static/[name].[ext]',
            },
          },
        }
      : server
        ? {
            ssr: true,
            target: 'esnext',
            rollupOptions: {
              input: './src/main.ts',
              output: { format: 'esm' },
              external: [...builtinModules, ...Object.keys(pkg.dependencies)],
            },
          }
        : undefined,
  };
});
