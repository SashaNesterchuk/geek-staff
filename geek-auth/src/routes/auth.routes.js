const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()
router.get('/token/:token', (req, res) => {
  const token = req.params.token
  jwt.verify(token, 'geek', (err, decodeToken) => {
    User.findById(decodeToken.userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error in authentication' })
      }
      res.json(user)
    })
  })
})
router.post(
  '/register',
  [
    check('email', 'Email is wrong').isEmail(),
    check('password', 'Password is wrong').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'Wrong data' })
      }
      const { name, email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        res.status(400).json({ message: 'This user exists' })
        return
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ name, email, password: hashedPassword })
      await user.save()
      res.status(201).json({ message: 'User was created' })
    } catch (e) {
      res.status(500).json({ message: `Register error: ${e.message}` })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Email is wrong').isEmail(),
    check('password', 'Password is wrong').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array, message: 'Wrong data' })
      }
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: 'User not exists' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(404).json({ message: 'Wrong message' })
      }
      const token = jwt.sign({ userId: user.id }, 'geek', {
        expiresIn: 60 * 60
      })
      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Register error' })
    }
  }
)

module.exports = router
