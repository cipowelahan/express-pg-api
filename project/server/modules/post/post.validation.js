const { body } = require('express-validator')
const validationMiddleware = require('../../middlewares/validation')
const multer = require('multer')
const thumbnailInput = multer({
  dest: "tmp/",
  fileFilter: (req, file, cb) => {
    const whitelist = [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ]

    if (!whitelist.includes(file.mimetype)) {
      return req.res.status(422).json({
        message: 'validation error',
        fields: [
          {
            field: 'post_picture',
            message: 'only file jpg or png'
          }
        ]
      })
    }

    cb(null, true)
  }
})

const validation = {
  create: () => {
    return [
      thumbnailInput.single('thumbnail'),
      body('title').isString().withMessage('title required'),
      body('content').isString().withMessage('content required'),
      validationMiddleware.formValidation
    ]
  },
}

module.exports = validation