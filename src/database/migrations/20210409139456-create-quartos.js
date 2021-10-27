'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Quarto', {
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
        allowNull: true,
        type: Sequelize.STRING,
      },
      capacidade: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      abrigo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Abrigo', key: 'id' },
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
    return queryInterface.dropTable('Quarto');

  }
};
