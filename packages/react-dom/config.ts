import cjs from "rollup-plugin-cjs-es"
import node_resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import * as path from 'path'

const BuildDirectory = path.resolve(__dirname, 'dist')

export default [
  {
    name: 'index',
    input: 'react-dom/cjs/react-dom.development.js',
    external: ['react', 'scheduler', 'scheduler/tracing'],
  },
  {
    name: 'server.browser',
    input: 'react-dom/cjs/react-dom-server.browser.development.js',
    external: ['react'],
  },
  {
    name: 'test-utils',
    input: 'react-dom/cjs/react-dom-test-utils.development.js',
    external: ['react', 'react-dom', 'scheduler'],
  },
].map(({ name, input, ...options }) => ({
  ...options,
  input,
  output: {
    file: `${BuildDirectory}/${name}.js`,
    format: 'esm',
    paths: {
      react: '@expert-elm/react',
      scheduler: '@expert-elm/scheduler',
      ['react-dom']: './react-dom',
      ['scheduler/tracing']: '@expert-elm/scheduler/tracing',
    },
  },
  plugins: [
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('development')
      },
      preventAssignment: true,
    }),
    node_resolve(),
    cjs({
      nested: true,
      exportType: 'named',
    }),
  ]
}))
