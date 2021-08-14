import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  plugins: [
    commonjs(),
    babel()
  ]
}

export default config
