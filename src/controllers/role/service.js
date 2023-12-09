const roleSchema = require('./schema')
const models = require('../../database/models/index')
const ResponseError = require('../../modules/response/ResponseError')
const PluginSqlizeQuery = require('../../modules/SqlizeQuery/PluginSqlizeQuery')

const { Role } = models
class RoleService {
  constructor() {}

  static async findAll(req) {
    const { filtered } = req.query
    const rawIncludes = []

    const includeQueryable = PluginSqlizeQuery.makeIncludeQueryable(
      filtered,
      rawIncludes
    )

    const { includeCount, ...restQuery } = PluginSqlizeQuery.generate(
      req,
      Role,
      includeQueryable
    )

    const data = await Role.findAll({
      ...restQuery,
    })

    const total = await Role.count({
      include: includeCount,
      where: restQuery.where,
    })

    return {
      data,
      total,
    }
  }

  static async findById(id) {
    const data = await Role.findOne({ where: { id } })

    if (!data) {
      throw new ResponseError.NotFound('data not found')
    }

    return data
  }

  static async create(formData) {
    const value = roleSchema.create.validateSync(formData)

    const data = await Role.create(value)

    return data
  }

  static async update(id, formData) {
    const data = await this.findById(id)

    const value = roleSchema.create.validateSync(formData)

    await data.update(value)
  }

  static async delete(id) {
    const data = await this.findById(id)

    await data.destroy(id)
  }
}

module.exports = RoleService
