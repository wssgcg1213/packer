'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackWrapPlugin = require('./webpack.wrap.plugin')
const babelConfig = require('./babel.config')
const ora = require('ora')
const spinner = ora({ spinner: 'monkey' })
const concatLoaders = (...loaders) => loaders
                        .map(loader => require.resolve(loader + '-loader'))
                        .join('!')
const extractedCss = new ExtractTextPlugin('index.css')

module.exports = {
  watch: true,
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        loader: concatLoaders('babel'),
        query: babelConfig
      }, {
        test: /\.scss$/,
        loader: extractedCss.extract([
          concatLoaders('css'),
          concatLoaders('sass')
        ])
      },{
        test: /\.css$/,
        loader: extractedCss.extract(
          concatLoaders('css')
        )
      }, {
        test: /\.less$/,
        loader: extractedCss.extract([
            concatLoaders('css'),
            concatLoaders('less')
        ])
      },
      { test: /\.woff2?$/, loader: concatLoaders('url') + '?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: concatLoaders('url') + '?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot$/, loader: concatLoaders('file') },
      { test: /\.svg$/, loader: concatLoaders('url') + '?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: concatLoaders('url') + '?limit=10000' },
      { test: /\.json$/, loader: concatLoaders('json') },
      { test: /\.html?$/, loader: concatLoaders('file') + '?name=[name].[ext]' }
    ]
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM'
  },

  plugins: [
    extractedCss,

    new webpack.ProgressPlugin((percentage, msg) => {
      spinner.text = msg
      if (msg === 'compile') {
        spinner.start()
      } else if (msg === 'emit') {
        spinner.text = 'Compile Succeed!'
        spinner.succeed()
      }
    }),

    new WebpackWrapPlugin({
      header: (filename, compilerEntry) => {
        if (/\.js$/.test(filename)) {
          return `
          (function(scripts, callback){
            var count = 0;
            function asyncScript(url) {
              var script = document.createElement('script');
              script.onload = function() {
                count = count + 1;
                if (count === scripts.length) {
                  callback();
                }
              }
              script.src = url;
              document.body.appendChild(script);
            }
            scripts.map(asyncScript);
          })(['//g.alicdn.com/third/react/15.3.2/??react-with-addons.js,react-dom.js'], function() {
              /* RAW CODE STARTED HERE */
          `
          // (function(scripts, callback){
          //   var count = 0;
          //   function asyncScript(url) {
          //     var script = document.createElement('script')
          //     script.onload = function() {
          //       count = count + 1;
          //       if (count === scripts.length) {
          //         callback();
          //       }
          //     }
          //     script.src = url;
          //   }
          //   scripts.map(asyncScript)
          // })(['//g.alicdn.com/third/react/15.3.2/??react-with-addons.js,react-dom.js'], function() {
          //     /* raw code here */
          // });
        }
        return ''
      },
      footer: (filename, compilerEntry) => {
        if (/\.js$/.test(filename)) {
          return '});'
        }
        return ''
      }
    })
  ]
}