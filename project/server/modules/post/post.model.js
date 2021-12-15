const database = require('../../configs/database')
const { DataTypes } = require('sequelize')

const post = database.define('post', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  user_id: {
    type: DataTypes.BIGINT,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },

}, {
  tableName: 'posts',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

post
  .sync({ alter: true, logging: false })
  .then(() => {
    console.log('table posts sync successfully')
  })
  .catch(err => {
    console.log('error sync table posts')
  })

module.exports = post