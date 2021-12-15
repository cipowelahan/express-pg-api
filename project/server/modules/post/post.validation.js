const { body } = require('express-validator')
const validationMiddleware = require('../../middlewares/validation')

const validation = {
  create: () => {
    return [
      body('title').isString().withMessage('title required'),
      body('content').isString().withMessage('content required'),
      validationMiddleware.formValidation
    ]
  },
}

module.exports = validation