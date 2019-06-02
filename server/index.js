const Server = require('./src/server.js')
const { connect } = require('./src/models/db.js')
const open = require('open')

async function main (argc, argv) {
  try {
    await connect()
  } catch (err) {
    console.error('连接数据库失败')
    console.error(err)
    process.exit(0)
  }

  const server = new Server()
  try {
    await server.start()
  } catch (err) {
    console.error('服务器启动失败')
    console.error(err)
    process.exit(0)
  }

  if (process.argv.slice(2)[0] === 'open') {
    await open('http://127.0.0.1:8093')
  }
}

main(process.argv.length, process.argv)
