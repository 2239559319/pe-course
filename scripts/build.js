const childProcess = require('child_process')
const path = require('path')
const { promisify } = require('util')
const exec = promisify(childProcess.exec)

const packagesRoot = path.resolve(__dirname, '..', 'packages')

const packages = [
  {
    name: 'scu-pecourse-utils',
    dir: path.join(packagesRoot, 'scu-pecourse-utils'),
    buildOptions: {
      input: 'src/index.js',
      format: [
        {
          file: 'lib/index.cjs.js',
          format: 'cjs'
        },
        {
          file: 'lib/index.esm.js',
          format: 'es'
        }
      ]
    }
  },
  {
    name: 'scu-pecourse-utils-dom',
    dir: path.join(packagesRoot, 'scu-pecourse-utils-dom'),
    buildOptions: {
      input: 'src/index.js',
      format: [
        {
          file: 'lib/index.esm.js',
          format: 'es'
        }
      ]
    }
  }
]

async function build(options) {
  const { name, dir, buildOptions } = options
  const { input, format } = buildOptions

  console.log(`${name} build start`)
  
  const builds = format.map(async({ file, format }) => {
    return await exec(`rollup -c -i ${path.join(dir, input)} -o ${path.join(dir, file)} -f ${format}`)
  })
  await Promise.all(builds)
  console.log(`${name} build done`)
}

;(async() => {
  for (const package of packages) {
    await build(package)
  }
})()
