const config = require('config')
const db = require('./core/db')

const express = require('express')
const app = express()

app.use(express.json())

void (async () => {
  await db.connect(config.get('mongoUri'))

  app.use('/auth', require('./routes/auth.routes'))
})()

app.listen(config.get('port'), () => console.log('started', config.get('port')))