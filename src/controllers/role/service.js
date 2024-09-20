import roleSchema from './schema'
import models from '@database/models/index'
import ResponseError from '@modules/response/ResponseError'
import PluginSqlizeQuery from '@modules/SqlizeQuery/PluginSqlizeQuery'

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

  static async create(formData, transaction) {
    const value = roleSchema.create.validateSync(formData)

    const data = await Role.create(value, { transaction })

    await transaction.commit()

    return data
  }

  static async update(id, formData, transaction) {
    const data = await this.findById(id)

    const value = roleSchema.create.validateSync(formData)

    await data.update(value, { transaction })

    await transaction.commit()
  }

  static async delete(id, transaction) {
    const data = await this.findById(id)

    await data.destroy(id, { transaction })

    await transaction.commit()
  }
}

module.exports = RoleService
