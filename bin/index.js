#!/usr/bin/env node

'use strict';
const yargs = require('yargs')
const path = require('path')
const cwd = process.cwd()

const options = {
  cwd: cwd
}

console.log(yargs.argv)

require('../lib')(options)
  .then(() => require('../server')(options))