'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('quartos', {
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
      capacidade: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      vagas_preenchidas: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      abrigoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'abrigos', key: 'id' },
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
    return queryInterface.dropTable('quartos');

  }
};
