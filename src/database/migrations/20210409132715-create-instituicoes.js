'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Instituicao', {
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
      telefone :{
        allowNull: false,
        type: Sequelize.STRING,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cidade :{
        allowNull: false,
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
      aprovado :{
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Instituicao');

  }
};
