const Role = require('../../database/models/role')
const ResponseError = require('../../modules/response/ResponseError')
const PluginSqlizeQuery = require('../../modules/SqlizeQuery/PluginSqlizeQuery')

class RoleService {
  constructor() {}

  static async getAllRole(req) {
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

  static async _findOne(id) {
    throw new ResponseError.BadRequest('asd')
  }
}

module.exports = RoleService
