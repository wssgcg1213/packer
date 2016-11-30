'use strict'

const gulp = require('gulp')
const webpack = require('gulp-webpack')
const path = require('path')
const cwd = process.cwd()
const getWebpackConfig = require('./lib/webpack.config')

const src = path.resolve(cwd, 'src')
const dist = path.resolve(cwd, 'dist')
const webpackConfig = getWebpackConfig()

gulp.task('default', () => {
  console.log(123)
  return gulp.src(src)
             .pipe(webpack(webpackConfig))
             .pipe(gulp.dest(dist))
})