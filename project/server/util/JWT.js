const JWT = require('jsonwebtoken')

exports.generate = (payload) => {
  return JWT.sign(
    payload,
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: (60 * parseInt(process.env.JWT_EXPIRED || '120'))
    }
  )
}

exports.middleware = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const [ bearer, token ] = authorization.split(' ')
    if (bearer == 'Bearer' && token) {
      JWT.verify(token, process.env.JWT_SECRET || 'secret', (err, decode) => {
        if (err) {
          return res.status(401).json({ message: err.message })
        }

        const { user_id } = decode
        res.locals.user_id = user_id

        return next()
      })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }

}