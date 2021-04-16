import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import json from '@rollup/plugin-json';

export default (input = './index.ts') => ({
  input,
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/index.es.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    peerDepsExternal(),
    resolve({
      moduleDirectories: ['main', 'module'],
    }),
    commonjs(),
    json(),
    typescript({ clean: true }),
  ],
});
