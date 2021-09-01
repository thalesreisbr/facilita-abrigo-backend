'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Abrigo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },  
      nome: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      descricao :{
        allowNull: true,
        type: Sequelize.STRING,
      },
      cep: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bairro: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      rua: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      numero: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Abrigo');

  }
};
