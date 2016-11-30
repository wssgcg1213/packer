const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const path = require('path')

module.exports = (options) => {
  const cwd = options.cwd || process.cwd()

  return new Promise((resolve, reject) => {
    const compiler = webpack(Object.assign({}, webpackConfig, {
      entry: [
        path.resolve(cwd, 'src/index.jsx')
      ],
      output: {
        path: path.resolve(cwd, 'dist'),
        filename: 'index.js'
      }
    }))
    compiler.watch({
      aggregateTimeout: 300, // wait so long for more changes
      poll: true // use polling instead of native watchers
    }, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log('')
        console.log(stats.toString({
          colors: true,
          timings: true,
          chunks: false,
          version: false,
          hash: false,
          reasons: true,
          children: false,
          assets: true
        }))
        console.log('')
        resolve(stats)
      }
    })
  })
}