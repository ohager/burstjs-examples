import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';

import fs from 'fs'
import nodeEval from 'node-eval'

export function getModuleExports(moduleId) {
  const id = require.resolve(moduleId);
  const moduleOut = nodeEval(fs.readFileSync(id).toString(), id);
  let result = [];
  const excludeExports = /^(default|__)/;
  if (moduleOut && typeof moduleOut === 'object') {
    result = Object.keys(moduleOut)
      .filter(name => !excludeExports.test(name))
  }

  return result
}

export function getNamedExports(moduleIds) {
  const result = {};
  moduleIds.forEach(id => {
    result[id] = getModuleExports(id)
  });
  return result
}

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css');
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs({
      namedExports: getNamedExports(['@burstjs/core', '@burstjs/util'])
    }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
