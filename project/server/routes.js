const express = require('express')
const router = express.Router()

router.use(({ res, next }) => {
  res.locals.error = (err) => {
    const { message, stack } = err
    return res.status(500).json({ message, stack })
  }

  return next()
})

router.get('/', ({ res }) => {
  return res.json({ title: 'Express' })
})

router.use('/auth', require('./modules/auth/auth.routes'))
router.use('/users', require('./modules/user/user.routes'))
router.use('/posts', require('./modules/post/post.routes'))

module.exports = router
