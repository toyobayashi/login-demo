const User = require('../models/user.js')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

async function getUserInfo (ctx) {
  const token = ctx.request.headers['x-access-token']
  if (!token) {
    ctx.status = 200
    ctx.response.body = {
      err: '请登录',
      data: null
    }
    return
  }
  try {
    const decode = jwt.verify(token, 'toyobayashi')
    ctx.status = 200
    ctx.response.body = {
      err: null,
      data: decode
    }
  } catch (err) {
    ctx.status = 200
    ctx.response.body = {
      err: '请登录',
      data: null
    }
  }
}

async function regiter (ctx) {
  try {
    const { code, pass } = ctx.request.body
    const user = await User.register(code, pass)
    ctx.status = 200
    ctx.response.body = {
      err: null,
      data: '创建用户成功【' + user.code + '】'
    }
  } catch (err) {
    ctx.status = 200
    ctx.response.body = {
      err: err.message,
      data: null
    }
  }
}

async function login (ctx) {
  try {
    const { code, pass } = ctx.request.body
    const user = await User.findOne({ code })
    if (!user) {
      ctx.status = 200
      ctx.response.body = {
        err: '用户不存在',
        data: null
      }
      return
    }
    const targetPass = crypto.pbkdf2Sync(pass, Buffer.from(user.salt, 'base64'), 10000, 64, null).toString('base64')
    if (user.pass !== targetPass) {
      ctx.status = 200
      ctx.response.body = {
        err: '用户名或密码错误',
        data: null
      }
      return
    }

    const token = jwt.sign({
      code: user.code,
      name: user.name
    }, 'toyobayashi')

    ctx.status = 200
    ctx.response.body = {
      err: null,
      data: {
        token
      }
    }
  } catch (err) {
    console.log(err)
    ctx.status = 200
    ctx.response.body = {
      err: '登录失败',
      data: null
    }
  }
}

module.exports = {
  regiter,
  login,
  getUserInfo
}
