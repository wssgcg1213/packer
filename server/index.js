'use strict'
const Koa = require('koa')
const koaStatic = require('koa-static');
const path = require('path')
const fs = require('fs')
const blacklist = {
  'node_modules': true
}

module.exports = (options) => {
  const app = new Koa()
  const cwd = options.cwd
  const port = options.port || 3333
  
  app.use(koaStatic(path.resolve(cwd), { index: '_index.html' }))

  app.use(function *() {
    const requestPath = path.join(cwd, this.path)
    const files = fs.readdirSync(requestPath).filter((filename) => filename[0] !== '.' && !blacklist[filename])
    this.body = files
  })
  app.listen(port, (err) => {
    if (err) {
      console.log('Dev Server error with detail')
      console.log(err.stack)
    } else {
      console.log(`Dev Server at http://localhost:${port}`)
    }
  })
  return app
}