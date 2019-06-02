const mongoose = require('mongoose')
const config = require('../config/config.js')

function connect () {
  return new Promise((resolve, reject) => {
    const uri = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`

    mongoose.connection.on('error', reject)
    mongoose.connection.once('open', () => {
      console.log('连接数据库成功：' + uri)
      resolve()
    })

    mongoose.connect(uri, {
      user: config.db.user,
      pass: config.db.pass,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    }, function (err) {
      if (err) {
        reject(err)
        return
      }
    })
  })
}

module.exports = {
  connect
}
