const database = require('../../configs/database')
const { DataTypes } = require('sequelize')
const userModel = require('../user/user.model')

const post = database.define('posts', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: DataTypes.BIGINT,
  thumbnail: DataTypes.TEXT,
  v_thumbnail: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.thumbnail) {
        return `${process.env.APP_URL}/uploads/${this.thumbnail}`
      } else {
        return null
      }
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_publish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'posts',
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

post.belongsTo(userModel, {
  foreignKey: 'user_id',
  as: 'user'
})

module.exports = post