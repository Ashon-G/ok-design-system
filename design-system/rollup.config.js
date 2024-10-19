import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

const packageJson = require('./package.json');

const rollupConfig = {
  input: 'src/index.ts', // Entry point of your component library
  output: [
    {
      file: packageJson.main,  // CommonJS output (for Node.js)
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: packageJson.module,  // ES Module output (for bundlers)
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    peerDepsExternal(),  // Exclude peer dependencies from the bundle
    resolve(),           // Resolve Node.js modules in node_modules
    commonjs(),          // Convert CommonJS modules to ES6
    typescript({ tsconfig: './tsconfig.json' }),  // TypeScript support
    postcss({
      plugins: [postcssImport()],  // Enable CSS imports
      extract: true,               // Extract CSS to a separate file
      minimize: true,              // Minify the CSS output
      modules: false,              // Set to true if using CSS modules
    }),
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
};

// Export the config object
export default rollupConfig;
