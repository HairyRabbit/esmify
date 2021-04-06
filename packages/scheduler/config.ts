import cjs from "rollup-plugin-cjs-es"
import node_resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import * as path from 'path'

const BuildDirectory = path.resolve(__dirname, 'dist')

export default [
  {
    name: 'index',
    input: 'scheduler/cjs/scheduler.development.js',
  },
  {
    name: 'tracing',
    input: 'scheduler/cjs/scheduler-tracing.development.js',
  },
  {
    name: 'unstable_mock',
    input: 'scheduler/cjs/scheduler-unstable_mock.development.js',
  },
  {
    name: 'tracing.profiling',
    input: 'scheduler/cjs/scheduler-tracing.profiling.min.js',
  },
  {
    name: 'unstable_post_task',
    input: 'scheduler/cjs/scheduler-unstable_post_task.development.js',
  },
].map(({ name, input, ...options }) => ({
  ...options,
  input,
  output: {
    file: `${BuildDirectory}/${name}.js`,
    format: 'esm',
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
