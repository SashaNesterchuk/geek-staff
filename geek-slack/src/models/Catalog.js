const { tagSchema } = require('./Tag')
const { Schema, model } = require('mongoose')
const schema = new Schema({
  name: { type: String, unique: true, required: true },
  description: String,
  link: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})
module.exports = model('Catalog', schema)
