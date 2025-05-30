import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/use-math.ts'),
      name: 'use-math',
      fileName: 'use-math',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'mathjs'],
      output: {
        globals: {
          react: 'React',
          mathjs: 'mathjs',
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
