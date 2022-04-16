const validationMiddleware = require('../middlewares/validation.middleware')

const { body } = require('express-validator')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const { Router } = require('express')
const router = Router()

router.post(
  '/reg',
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Wrong password format').isLength({ min: 8 }),
  validationMiddleware,
  async (req, res) => {
    try {

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

router.post(
  '/login',
  body('email', 'Wrong email format').isEmail(),
  body('password', 'Wrong password format').isLength({ min: 8 }),
  validationMiddleware,
  async (req, res) => {
    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (!candidate || !(await bcrypt.compare(password, candidate.password)))
        return res.status(400).json({ success: false, error: 'User not found' })

      const token = jwt.sign(
        { userId: candidate._id.toString() },
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