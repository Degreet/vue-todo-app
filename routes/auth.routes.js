const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  try {
    res.json({ success: true })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router