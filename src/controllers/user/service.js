const userSchema = require('./schema')
const models = require('../../database/models/index')
const ResponseError = require('../../modules/response/ResponseError')
const PluginSqlizeQuery = require('../../modules/SqlizeQuery/PluginSqlizeQuery')

const { User, Role } = models
class UserService {
  constructor() {}

  static async findAll(req) {
    const { filtered } = req.query
    const rawIncludes = [{ model: Role }]

    const includeQueryable = PluginSqlizeQuery.makeIncludeQueryable(
      filtered,
      rawIncludes
    )

    const { includeCount, ...restQuery } = PluginSqlizeQuery.generate(
      req,
      User,
      includeQueryable
    )

    const data = await User.findAll({
      ...restQuery,
    })

    const total = await User.count({
      include: includeCount,
      where: restQuery.where,
    })

    return {
      data,
      total,
    }
  }

  static async findById(id) {
    const data = await User.findOne({
      where: { id },
      include: [{ model: Role }],
    })

    if (!data) {
      throw new ResponseError.NotFound('data not found')
    }

    return data
  }

  static async create(formData) {
    const value = userSchema.create.validateSync(formData)

    const data = await User.create(value)

    return data
  }

  static async update(id, formData) {
    const data = await this.findById(id)

    const value = userSchema.create.validateSync(formData)

    await data.update(value)
  }
}

module.exports = UserService
