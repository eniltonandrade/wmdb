'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MovieGenres', {
      movieId: {
        type: Sequelize.INTEGER,
        references: { model: 'Movies', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: { model: 'Genres', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('MovieGenres');
  }
};
