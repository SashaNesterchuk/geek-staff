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

module.exports = router
