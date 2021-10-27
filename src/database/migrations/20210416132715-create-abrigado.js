'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Abrigado', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },  
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      telefone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      documento: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sexo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      data_de_nascimento: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Abrigado');

  }
};
