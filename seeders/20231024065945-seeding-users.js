'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/users.json').map((e) => {
      // Hash the password and update the object
      e.password = hashPassword(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
  },
};

