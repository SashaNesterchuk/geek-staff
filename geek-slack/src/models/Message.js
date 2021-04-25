const { Schema, model } = require('mongoose')
const schema = new Schema({
  message: { type: String, required: true },
  groupId: { type: Schema.Types.ObjectId },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  user: { type: Schema.Types.ObjectId },
  created: { type: Date },
  edited: { type: Date }
})

module.exports = model('Message', schema)
