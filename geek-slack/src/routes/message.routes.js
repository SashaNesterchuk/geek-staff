const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()
const Message = require('../models/Message')
const ObjectId = require('mongodb').ObjectId
router.get(
  '',
  [check('groupId', 'group id is required in messages').exists()],
  (req, res) => {
    const validations = validationResult(req)
    if (!validations.isEmpty()) {
      return res
        .status(500)
        .json({ errors: validations.array(), message: 'Wrong data' })
    }
    const { groupId } = req.query
    Message.find({ groupId: ObjectId(groupId) })
      .populate('group')
      .exec((err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: `Messages err: ${err.message}` })
        }
        return res.json({ messages: data })
      })
  }
)

router.post('', [check('message').exists()], (req, res) => {
  const validations = validationResult(req)
  if (!validations.isEmpty()) {
    return res
      .status(500)
      .json({ errors: validations.array(), message: 'Wrong data' })
  }
  const { message, groupId, userId } = req.body
  Message.create(
    { message, group: groupId, user: userId, groupId, created: new Date() },
    (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message })
      }
      return res.json(data)
    }
  )
})
module.exports = router
