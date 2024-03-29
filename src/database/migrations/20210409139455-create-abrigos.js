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
        allowNull: false,
        type: Sequelize.STRING,
      },
      descricao :{
        allowNull: false,
        type: Sequelize.STRING,
      },
      telefone :{
        allowNull: false,
        type: Sequelize.STRING,
      },
      aprovado :{
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      cep: {
        allowNull: true,
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
