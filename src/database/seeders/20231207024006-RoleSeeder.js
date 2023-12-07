const RoleId = require('../../constants/ConstRole')
const { v4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: v4(),
        fullname: 'test admin',
        email: 'test.admin@mail.com',
        password: 'admin123',
        RoleId: RoleId.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        fullname: 'test user',
        email: 'test.user@mail.com',
        password: 'user123',
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
