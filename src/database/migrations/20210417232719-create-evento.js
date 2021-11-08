'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Evento', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      estadia_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Estadia', key: 'id' },
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
    return queryInterface.dropTable('Evento');

  }
};
