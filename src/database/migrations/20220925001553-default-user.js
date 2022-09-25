'use strict'
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = bcrypt.hashSync('users123', 10)
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'default',
        password: hashPassword,
        email: 'defaultuser@gmail.com',
        fullname: 'default user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { email: 'defaultuser@gmail.com' })
  },
}
