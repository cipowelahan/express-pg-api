const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()
require('dotenv').config()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(helmet())
app.use(compression())

// databases
const database = require('./configs/database')
database.authenticate()
  .then(() => console.log('Database Connection Successfully'))
  .catch(err => console.log('Error Database Connection: ' + err))

// set up global routes
app.use(require('./routes'))

// catch 404 and forward to error handler
app.use(({ res }) => {
  return res.status(404).json({
    message: 'Route Not Found'
  })
})

module.exports = app
