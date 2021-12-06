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