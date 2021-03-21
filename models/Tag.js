const { Schema, model } = require('mongoose')
const schema = new Schema({
  name: { type: String, required: true }
})
exports.tagSchema = schema
module.exports = model('Tag', schema)
