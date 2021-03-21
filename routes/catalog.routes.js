const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()
const Catalog = require('../models/Catalog')

router.post(
  '/create',
  [
    check('name', 'Name is required').exists(),
    check('link', 'Link is required').exists(),
    check('name').custom((value) => {
      return Catalog.findOne({ name: value }).then((data) => {
        if (data) {
          return Promis.reject('Catalog is exist')
        }
      })
    })
  ],
  async (req, res) => {
    try {
      const validations = validationResult(req)
      if (!validations.isEmpty()) {
        return res
          .status(500)
          .json({ errors: validations.array(), message: 'Wrong data' })
      }
      const { name, link, tags, description } = req.body
      const catalog = new Catalog({ name, link, tags, description })
      catalog.save()
      res.status(200).json(catalog)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)
router.get('/all', async (req, res) => {
  try {
    const catalogs = await Catalog.find({})
    res.json(catalogs)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})
module.exports = router
