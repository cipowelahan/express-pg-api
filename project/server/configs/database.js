const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  port: process.env.PG_PORT || '5432',
  username: process.env.PG_USER || 'root',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DATABASE || 'database',
})

module.exports = sequelize