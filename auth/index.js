const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
const secret = config.jwt.secret

const sign = (data) => jwt.sign(data, secret)

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)
    console.log('decodeHeader :: ', decoded)

    if (decoded.id !== owner) throw error('No puedes editar este usuario2', 401)

  }
}

const verify = (token) => jwt.verify(token, secret)

const getToken = (auth) => {
  if (!auth) throw new Error('No viene Token')
  if (auth.indexOf('Bearer ') === -1) throw new Error('Formato Invalido')

  return auth.replace('Bearer ', '')
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

module.exports = {
  sign,
  check
}