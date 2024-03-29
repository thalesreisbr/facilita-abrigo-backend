'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
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
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        unique: true,
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
      token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      token_refresh: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      token_recuperar_senha: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      abrigo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Abrigo', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Instituicao', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Usuario');

  }
};
