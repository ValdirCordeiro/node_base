'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [{
      nome: 'valdir',
      login: 'valdir',
      ativo: 1,
      email: "vjcordeiror@gmail.com",
      senha: "123456",
      permissao: "L;A",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
