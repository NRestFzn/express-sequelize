const RoleId = require('../../constants/ConstRole')
const { hashSync } = require('bcrypt')
const { v4 } = require('uuid')

const defaultPassword = 'admin123'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: v4(),
        fullname: 'test admin',
        email: 'test.admin@mail.com',
        password: hashSync(defaultPassword, 7),
        RoleId: RoleId.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        fullname: 'test user',
        email: 'test.user@mail.com',
        password: hashSync(defaultPassword, 7),
        RoleId: RoleId.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
