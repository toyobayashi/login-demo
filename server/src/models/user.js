const { Schema, model } = require('mongoose')
const crypto = require('crypto')

const userSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  }
})

const User = model('User', userSchema)

User.register = async function (code, pass = '123456', name = code) {
  if (!code) {
    throw new Error('创建用户需要指定用户名')
  }

  const saltBuf = crypto.randomBytes(16)
  const salt = saltBuf.toString('base64')

  const savePass = crypto.pbkdf2Sync(pass, saltBuf, 10000, 64, null).toString('base64')

  const user = new User({
    name,
    code,
    pass: savePass,
    salt
  })

  return user.save()
}

module.exports = User
