const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).json({ message: err })
      return
    }
    res.json({ data: users })
  })
})
router.get('/users/:id', (req, res) => {
  const id = req.params.id
  User.findById(id, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.json(data)
  })
})

module.exports = router
