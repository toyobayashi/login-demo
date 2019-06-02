const KoaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')

const userController = require('../controllers/user.js')

const router = new KoaRouter()


router.post('/api/user/create', userController.regiter)
router.post('/api/user/login', userController.login)
router.get('/api/user/info', userController.getUserInfo)
// router.get('*', async ctx => {
//   ctx.status = 200
//   ctx.type = 'html'
//   ctx.body = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8')
// })

module.exports = router
