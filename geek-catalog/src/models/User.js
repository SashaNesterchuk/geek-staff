const { Schema, model } = require('mongoose')
const schema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }
})
module.exports = model('User', schema)
