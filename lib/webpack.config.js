'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const getBabelConfig = require('./babel.config')
const babelConfig = getBabelConfig()

module.exports = () => {

  return {
    watch: true,
    
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: babelConfig
        }, {
          test: /\.s[c|a]ss$/,
          loader: 'style!css!sass'
        },{
          test: /\.css$/,
          loader: 'style!css'
        }, {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
        { test: /\.ttf$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot$/, loader: 'file' },
        { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=10000' },
        { test: /\.json$/, loader: 'json' },
        { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
      ]
    }
  }
}