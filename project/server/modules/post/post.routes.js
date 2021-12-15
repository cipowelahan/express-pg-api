const express = require('express')
const router = express.Router()

const service = require('./post.service')
const validation = require('./post.validation')
const jwtUtil = require('../../util/JWT')

router.use(jwtUtil.middleware)

router.get('/', ({ res }) => {
  const { user_id } = res.locals
  service
    .fetch(user_id)
    .then(data => res.json({ message: 'List Posts', data }))
    .catch(err => res.locals.error(err))
})

router.post('/', validation.create(), ({ body }, res) => {
  const { user_id } = res.locals
  const { title, content } = body
  const data = { user_id, title, content }
  service
    .create(data)
    .then(data => res.json({ message: 'New Post Created', data }))
    .catch(err => res.locals.error(err))
})

router.get('/:postId', ({ params }, res) => {
  const { user_id } = res.locals
  const { postId } = params
  service
    .findBy(user_id, 'id', postId)
    .then(data => res.json({ message: 'Detail Post', data }))
    .catch(err => res.locals.error(err))
})

router.put('/:postId', validation.create(), ({ body, params }, res) => {
  const { user_id } = res.locals
  const { postId } = params
  const { title, content } = body
  const data = { user_id, title, content }
  service
    .update(user_id, postId, data)
    .then(success => res.json({ message: 'Update Post', success }))
    .catch(err => res.locals.error(err))
})

router.delete('/:postId', ({ params }, res) => {
  const { user_id } = res.locals
  const { postId } = params
  service
    .destroy(user_id, postId)
    .then(success => res.json({ message: 'Delete Post', success }))
    .catch(err => res.locals.error(err))
})

module.exports = router
