const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const { Router } = require('express')
const router = Router()

router.post(
  '/reg',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, error: errors.array()[0] })

      let { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate)
        return res.status(400).json({ success: false, error: 'Email claimed' })

      password = await bcrypt.hash(password, 10)
      const user = await User.create({ email, password })

      const token = jwt.sign(
        { userId: user._id.toString() },
        config.get('privateKey'),
        { expiresIn: '2h' }
      )

      res.json({ success: true, token })
    } catch (e) {
      console.error(e)
    }
  }
)

module.exports = router