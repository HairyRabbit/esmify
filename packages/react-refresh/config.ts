import cjs from "rollup-plugin-cjs-es"
import node_resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import * as path from 'path'

const BuildDirectory = path.resolve(__dirname, 'dist')

export default [
  {
    name: 'runtime',
    input: 'react-refresh/cjs/react-refresh-runtime.development.js',
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
