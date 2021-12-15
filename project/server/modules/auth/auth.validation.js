const { body } = require('express-validator')
const validationMiddleware = require('../../middlewares/validation')
const userService = require('../user/user.service')

const validation = {
  login: () => {
    return [
      body('username').isString().withMessage('username required'),
      body('password').isString().withMessage('password required'),
      validationMiddleware.formValidation
    ]
  },
  register: () => {
    return [
      body('username')
        .isLength({ min: 6, max: 16 })
        .withMessage('username min 6 and max 16 character')
        .custom(async (value) => {
          if (value) {
            return userService.findBy('username', value).then(user => {
              if (user) return Promise.reject('username already taken')
            })
          }
        }),
      body('name').isString().withMessage('name required'),
      body('password')
        .isLength({ min: 6, max: 12 })
        .withMessage('password min 6 and max 12 character'),
      body('address').not().trim().escape(),
      validationMiddleware.formValidation
    ]
  }
}

module.exports = validation