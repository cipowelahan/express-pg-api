const database = require('../../configs/database')
const { DataTypes } = require('sequelize')

const user = database.define('user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  address: {
    type: DataTypes.TEXT
  },

}, {
  tableName: 'users',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
})

user
  .sync({ alter: true, logging: false })
  .then(() => {
    console.log('table users sync successfully')
  })
  .catch(err => {
    console.log('error sync table users')
  })

module.exports = user