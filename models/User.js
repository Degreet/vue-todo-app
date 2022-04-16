const mongoose = require('mongoose')

const model = new mongoose.Schema({
  email: String,
  password: String,
  dateReg: { type: Date, default: Date.now },
  todos: { type: Array, default: [] },
})

module.exports = mongoose.model('User', model)