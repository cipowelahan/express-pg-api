const postModel = require('./post.model')
const paginationUtil = require('../../util/pagination')

const service = {
  fetch: async (user_id, query) => {
    const configPaginate = paginationUtil.generateConfig({
      query,
      extraCondition: { user_id },
      allowedFilterField: [
        'id',
        'title',
        'slug',
        'content',
        'is_publish',
        'created_at',
        'updated_at'
      ]
    })
    const posts = await postModel.findAndCountAll({
      ...configPaginate,
      include: [
        {
          association: 'user',
          attributes: ['name']
        }
      ]
    })
    return paginationUtil.json(query, posts)
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