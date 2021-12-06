const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

router.get('/', async (req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash("test hash", salt)
  res.send('respond with a resource ' + hash)
})

module.exports = router
