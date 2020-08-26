'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserMovies', {
      movieId: {
        type: Sequelize.INTEGER,
        references: { model: 'Movies', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      watchedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('UserMovies');
  }
};
