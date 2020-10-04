const path = require('path')

const srcPath = path.resolve(__dirname, 'src')
const buildPath = path.resolve(__dirname, 'build')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.join(buildPath, process.env.TARGET === 'web' ? 'web' : 'node'),
    libraryTarget: process.env.TARGET === 'web' ? 'var' : 'commonjs2'
  },
  target: process.env.TARGET === 'web' ? 'web' : 'node'
}

module.exports = config