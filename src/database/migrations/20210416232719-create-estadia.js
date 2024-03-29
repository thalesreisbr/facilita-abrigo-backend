'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estadia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_inicio: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_saida: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      abrigado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Abrigado', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      quarto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Quarto', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Estadia');

  }
};
