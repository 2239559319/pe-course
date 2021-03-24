import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    babel({
      presets: [
        '@babel/preset-env'
      ]
    })
  ]
}

export default config
