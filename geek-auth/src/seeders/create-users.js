const seeder = require('mongoose-seed')
const path = require('path')
const { db } = require('../configuration')
const bcrypt = require('bcryptjs')
const password = bcrypt.hash('12341234', 12)
const data = [
  {
    model: 'User',
    documents: [
      {
        name: 'Alexander Nesterchuk',
        email: 'alex@test.com',
        password
      },
      {
        name: 'Vova',
        email: 'vova@test.com',
        password
      }
    ]
  }
]
seeder.connect(db, () => {
  seeder.loadModels([path.join(process.cwd(), '/src/models/User.js')])
  seeder.clearModels(['User'])
  seeder.populateModels(data, function () {
    seeder.disconnect()
  })
})
