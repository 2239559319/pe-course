import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  plugins: [
    commonjs(),
    babel({
      presets: [
        [
          '@babel/preset-env'
        ]
      ]
    })
  ]
}

export default config
