const { validationResult } = require('express-validator')

module.exports = function validationMiddleware(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, error: errors.array()[0].msg })

  return next()
}