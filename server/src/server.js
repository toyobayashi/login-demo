const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const convert = require('koa-convert')
const cors = require('koa-cors')
const koaBodyparser = require('koa-bodyparser')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const router = require('./routers/router.js')
const http = require('http')
const config = require('./config/config.js')

class Server {
  constructor () {
    const app = new Koa()
    app
      .use(historyApiFallback({ whiteList: ['/api'] }))
      .use(convert(cors()))
      .use(koaBodyparser())
      .use(koaStatic(path.join(__dirname, '../dist')))
      .use(router.routes())
      .use(router.allowedMethods())

    this.app = app
    this.server = null
  }

  start () {
    return new Promise((resolve, reject) => {
      if (this.server !== null) reject(new Error('服务器已启动'))
      this.server = http.createServer(this.app.callback()).listen(config.port, config.host, () => {
        console.log(`服务器已启动：http://${config.host}:${config.port}`)
        resolve()
      })
      this.server.on('error', reject)
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  }
}

module.exports = Server
