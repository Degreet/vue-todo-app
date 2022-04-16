const authMiddleware = require('../middlewares/auth.middleware')
const randomstring = require('randomstring')

const { Router } = require('express')
const router = Router()

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { user } = req
    if (!user) return

    return res.json({ success: true, todos: user.todos })
  } catch (e) {
    console.error(e)
  }
})

router.post('/create', authMiddleware, async (req, res) => {
  try {
    let { title } = req.body
    if (!title || !title.trim())
      return res.status(400).json({ error: 'Incorrect todo title' })

    const { user } = req
    if (!user) return

    const id = randomstring.generate()
    title = title.trim()

    user.todos.unshift({ id, title })
    await user.save()

    return res.send({ success: true, id })
  } catch (e) {
    console.error(e)
  }
})

router.post('/remove', authMiddleware, async (req, res) => {
  try {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'Incorrect todo id' })

    const { user } = req
    if (!user) return

    user.todos = user.todos.filter((todo) => todo.id !== id)
    await user.save()

    return res.send({ success: true })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router