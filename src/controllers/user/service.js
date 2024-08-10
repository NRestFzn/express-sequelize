import bcrypt from 'bcrypt'
import userSchema from './schema'
import models from '@database/models/index'
import ResponseError from '@modules/response/ResponseError'
import PluginSqlizeQuery from '@modules/SqlizeQuery/PluginSqlizeQuery'

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
    const data = await User.scope('withPassword').findOne({
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

    const value = userSchema.update.validateSync(formData)

    await data.update(value)
  }

  static async delete(id) {
    const data = await this.findById(id)

    await data.destroy(id)
  }

  static async changePassword(id, formData) {
    const data = await this.findById(id)

    const value = userSchema.changePassword.validateSync(formData)

    const compareOldPassword = await bcrypt.compareSync(
      value.oldPassword,
      data.password
    )

    if (!compareOldPassword)
      throw new ResponseError.BadRequest('Incorrect old password')

    await data.update({
      ...data,
      ...value,
      password: value.confirmNewPassword,
    })
  }
}

module.exports = UserService
