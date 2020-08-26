module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MovieCompanies', {
    movieId: {
      type: Sequelize.INTEGER,
      references: { model: 'Movies', key: 'id' },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    companyId: {
      type: Sequelize.INTEGER,
      references: { model: 'Companies', key: 'id' },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('MovieCompanies'),
};
