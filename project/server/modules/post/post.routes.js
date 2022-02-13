const express = require('express')
const router = express.Router()

const service = require('./post.service')
const validation = require('./post.validation')
const jwtUtil = require('../../util/JWT')
const uploadUtil = require('../../util/upload')
const sluggo = require('sluggo')

router.use(jwtUtil.middleware)

router.get('/', (req, res) => {
  const { user_id } = res.locals
  service
    .fetch(user_id, req.query)
    .then(data => res.json({ message: 'List Post', data }))
    .catch(err => res.locals.error(err))
})

router.post('/', validation.create(), async ({ body, file }, res) => {
  const { user_id } = res.locals
  const { title, content } = body
  const slug = sluggo(title)
  const data = { user_id, title, slug, content }

  if (typeof file !== "undefined") {
    const resultUpload = await uploadUtil.store(file, { dirUpload: 'posts' })
    console.log(resultUpload)
    if (resultUpload.success) {
      data.thumbnail = resultUpload.pathName
    }
  }

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

router.post('/:postId/update', validation.create(), async ({ body, params, file }, res) => {
  const { user_id } = res.locals
  const { postId } = params
  const { title, content } = body
  const slug = sluggo(title)
  const data = { user_id, title, slug, content }

  if (typeof file !== "undefined") {
    const resultUpload = await uploadUtil.store(file, { dirUpload: 'posts' })
    if (resultUpload.success) {
      data.thumbnail = resultUpload.pathName
    }
  }

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
