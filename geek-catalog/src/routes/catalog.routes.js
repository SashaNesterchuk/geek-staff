const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()
const Catalog = require('../models/Catalog')
const Tag = require('../models/Tag')
const axios = require('axios')
const { authApiUrl } = require('../configuration')
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
      const savedTags = []
      for (const tag of tags) {
        let resTag = await Tag.findOne({ name: tag })
        if (!resTag) {
          resTag = await new Tag({ name: tag })
          resTag.save()
        }
        savedTags.push(resTag._id)
      }
      const catalog = new Catalog({ name, link, description, tags: savedTags })
      catalog.save()
      res.status(200).json(catalog)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)
router.get('/all', async (req, res) => {
  try {
    const catalogs = await Catalog.find({}).populate('tags')
    res.json(catalogs)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})
router.delete(
  '/delete',
  [check('id', 'Id is required').exists()],
  async (req, res) => {
    try {
      const validations = validationResult(req)
      if (!validations.isEmpty()) {
        return res
          .status(500)
          .json({ errors: validations.array(), message: 'Wrong data' })
      }
      const { id } = req.body
      await Catalog.find({ _id: id }).remove()
      res.status(201)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
)
router.get('/test', async (req, res) => {
  const { data } = await axios.get(`${authApiUrl}/users`)
  res.json(data)
})
module.exports = router
