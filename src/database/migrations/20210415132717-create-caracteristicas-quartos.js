'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Caracteristica_Quartos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },  
      quarto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Quarto', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      caracteristica_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Caracteristica', key: 'id' },
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
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Caracteristica_Quartos');

  }
};
