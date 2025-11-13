import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/date-range-selector-card.ts',
    output: {
      file: 'dist/date-range-selector-card.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      terser({
        format: {
          comments: false,
        },
        compress: {
          drop_console: false,
        },
      }),
    ],
  },
  {
    input: 'src/popup-wrapper-card.ts',
    output: {
      file: 'dist/popup-wrapper-card.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      terser({
        format: {
          comments: false,
        },
        compress: {
          drop_console: false,
        },
      }),
    ],
  },
];
