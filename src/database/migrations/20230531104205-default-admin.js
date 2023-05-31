'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = bcrypt.hashSync('admin123', 10)
    await queryInterface.bulkInsert('users', [
      {
        id: 2,
        username: 'admin',
        password: hashPassword,
        email: 'admin@gmail.com',
        fullname: 'default admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'admin@gmail.com' })
  },
}
