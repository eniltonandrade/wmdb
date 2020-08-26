'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MoviePeople', {
      movieId: {
        type: Sequelize.INTEGER,
        references: { model: 'Movies', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      personId: {
        type: Sequelize.INTEGER,
        references: { model: 'People', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      character: {
        allowNull: true,
        type: Sequelize.STRING
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('MoviePeople');
  }
};
