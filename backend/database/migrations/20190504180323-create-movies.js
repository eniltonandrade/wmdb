'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      original_title: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      tmdbId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imdbId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      poster_path: {
        allowNull: true,
        type: Sequelize.STRING
      },
      backdrop_path: {
        allowNull: true,
        type: Sequelize.STRING
      },
      release_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      vote_average: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      runtime: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Movies');
  }
};
