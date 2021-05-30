const { Schema, model } = require('mongoose')
const schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['DIRECT', 'CHANNEL'], required: true },
  users: [{ _id: Schema.Types.ObjectId, name: String, email: String }]
})

module.exports = model('Group', schema)
