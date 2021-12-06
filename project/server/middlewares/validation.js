const { validationResult } = require('express-validator')

// Object Error
// {
//     value: '',
//     msg: 'Invalid value',
//     param: 'username',
//     location: 'body'
// }

const validation = {
  formValidation: (req, res, next) => {
    const errors = []
    const formResult = validationResult(req)

    if (!formResult.isEmpty()) {
      for (const field of formResult.array()) {
        errors.push({
          field: field.param,
          message: field.msg
        })
      }
    }

    if (errors.length === 0) {
      return next()
    }

    return res.status(422).json({
      message: 'validation error',
      fields: errors
    })
  }
}

module.exports = validation