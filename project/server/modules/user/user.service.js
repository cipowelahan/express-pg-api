const userModel = require('./user.model')

const service = {
  findBy: async (colomn, value) => {
    const user = await userModel.findOne({
      where: {
        [colomn]: value
      }
    })
    return user
  },
  create: async (data) => {
    const user = await userModel.create(data)
    return user
  }
}

module.exports = service