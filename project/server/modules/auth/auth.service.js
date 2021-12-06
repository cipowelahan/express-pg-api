const userService = require('../user/user.service')
const bcrypt = require('bcrypt')

const service = {
  login: async ({ username, password }) => {
    const user = await userService.findBy('username', username)

    if (user !== null) {
      const match = await bcrypt.compare(password, user.password)
      return match ? user : null
    }
    
    return null
  },
  register: async ({ username, name, password, address }) => {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const dataSave = {
      username,
      name,
      password: hashedPassword,
      address
    }

    const user = await userService.create(dataSave)
    return user
  },
  getProfil: async (id) => {
    const user = await userService.findBy('id', id)
    let data = user.toJSON()
    delete data.password

    return data
  }
}

module.exports = service