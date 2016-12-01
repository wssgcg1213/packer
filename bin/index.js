#!/usr/bin/env node

'use strict';
const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()

const options = {
  cwd: cwd
}

// console.log(yargs.argv)
try {
  const srcFiles = fs.readdirSync(path.join(cwd, 'src'))
  const entry = srcFiles.filter((filename) => /^index.jsx?$/.test(filename))
                        .map((filename) => path.join(cwd, 'src', filename))
  if (entry.length === 0) {
    throw new Error('Entry Not Found')
  }
  options.entry = entry
  entry.forEach((file) => console.log(`Detected entry: ${entry}`))
  console.log('Start compiling...')
} catch(err) {
  console.log('Can not find entry file. Please check src/index.jsx exists.')
}

require('../lib')(options)
  .then(() => require('../server')(options))
  .catch((err) => {
    console.log('Error while cli')
    console.error(err.stack)
  })