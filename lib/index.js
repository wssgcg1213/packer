'use strict'

const Liftoff = require('liftoff')
const interpret = require('interpret')
const v8flags = require('v8flags')
const yargs = require('yargs')
const cliOptions = require('./cliOptions')

const cli = new Liftoff({
  name: 'packer',
  // completions: //TODO
  extensions: interpret.jsVariants,
  v8flags: v8flags,
  configFiles: {
    '.gulp': {
      home: {
        path: '~',
        extensions: interpret.extensions
      },
      cwd: {
        path: '.',
        extensions: interpret.extensions
      }
    }
  }
})

const usage = `\n${chalk.bold('Usage:')} gulp ${chalk.blue('[options]')} tasks`
const parser = yargs.usage(usage, cliOptions);
const opts = parser.argv;

module.exports = () => {
  console.log(opts)
  // cli.launch({
  //   cwd: opts.cwd,
  //   configPath: opts.gulpfile,
  //   require: opts.require,
  //   completion: opts.completion,
  // }, handleArguments);
}