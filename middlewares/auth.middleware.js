const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async function authMiddleware(req, res, next) {
  try {
    let token = req.headers['authorization']
    if (!token) return res.sendStatus(401)

    token = token.split(' ')[1]
    let data

    try {
      data = jwt.verify(token, config.get('privateKey'))
      if (!data) return res.sendStatus(401)
    } catch {
      return res.sendStatus(401)
    }

    const { userId } = data
    const user = await User.findOne({ _id: userId })
    if (!user) return res.sendStatus(401)

    req.user = user
    return next()
  } catch (e) {
    console.error(e)
  }
}