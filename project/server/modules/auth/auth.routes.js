const express = require('express')
const router = express.Router()

const service = require('./auth.service')
const validation = require('./auth.validation')
const jwtUtil = require('../../util/JWT')

router.post('/login', validation.login(), ({ body }, res) => {
  service
    .login(body)
    .then((user) => {
      if (user === null) {
        return res.status(400).json({ message: 'Invalid username or password' })
      }

      const token = jwtUtil.generate({ user_id: user.id })

      return res.json({ message: 'Login Successfully', token })
    })
    .catch(err => res.locals.error(err))
  
})

router.post('/register', validation.register(), ({ body }, res) => {
  service
    .register(body)
    .then(() => res.json({ message: 'Berhasil' }))
    .catch(err => res.locals.error(err))
})

router.get('/profile', jwtUtil.middleware, ({ res }) => {
  const { user_id } = res.locals

  service
    .getProfil(user_id)
    .then((data) => res.json({ message: 'Berhasil', data }))
    .catch(err => res.locals.error(err))
})

module.exports = router