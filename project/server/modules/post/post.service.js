const postModel = require('./post.model')

const service = {
  fetch: async (user_id) => {
    const posts = await postModel.findAll({ where: { user_id } })
    return posts
  },
  findBy: async (user_id, colomn, value) => {
    const post = await postModel.findOne({ where: { user_id, [colomn]: value } })
    return post
  },
  create: async (data) => {
    const post = await postModel.create(data)
    return post
  },
  update: async (user_id, id, data) => {
    const [ affectedRows ] = await postModel.update(data, { where: { user_id, id } })
    return affectedRows > 0
  },
  destroy: async (user_id, id) => {
    const affectedRows = await postModel.destroy({ where: { user_id, id } })
    return affectedRows > 0
  }
}

module.exports = service