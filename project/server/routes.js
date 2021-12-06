const express = require('express')
const router = express.Router()

router.use(({ res, next }) => {
  res.locals.error = (err) => {
    console.log(err)
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    })
  }

  return next()
})

router.get('/', ({ res }) => {
  return res.json({ title: 'Express' })
})

router.use('/auth', require('./modules/auth/auth.routes'))
router.use('/users', require('./modules/user/user.routes'))

module.exports = router
