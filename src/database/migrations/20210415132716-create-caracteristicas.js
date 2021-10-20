'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Caracteristica', {
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
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
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
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Caracteristica');

  }
};
