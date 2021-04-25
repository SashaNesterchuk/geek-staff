const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()
const Group = require('../models/Group')

router.get('', (req, res) => {
  Group.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Groups error: ${err.message}` })
      return
    }
    res.json(data)
  })
})
router.get('/:id', (req, res) => {
  Group.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Group error: ${err.message}` })
      return
    }
    res.json(data)
  })
})
router.post(
  '',
  [
    check('name').custom((value) => {
      return Group.findOne({ name: value }).then((data) => {
        if (data) {
          return Promis.reject('Group is exist')
        }
      })
    }),
    check('type').exists()
  ],
  (req, res) => {
    const validations = validationResult(req)
    if (!validations.isEmpty()) {
      return res
        .status(500)
        .json({ errors: validations.array(), message: 'Wrong data' })
    }
    const { name, type, users } = req.body
    Group.create({ name, type, users }, (err, data) => {
      if (err) {
        res.status(500).json(`Group created err: ${err.message}`)
        return
      }
      res.json(data)
    })
  }
)
router.delete('/:id', (req, res) => {
  const id = req.params.id

  Group.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      res.status(500).json(`Group deleted err: ${err.message}`)
      return
    }
    res.status(200).json({ data: true })
  })
})

module.exports = router
