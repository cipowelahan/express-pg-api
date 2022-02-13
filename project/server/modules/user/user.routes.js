const express = require('express')
const router = express.Router()

router.get('/', (req, rest) => {
  const { filter = JSON.stringify([]) } = req.query
  rest.json(JSON.parse(filter))
})

module.exports = router
