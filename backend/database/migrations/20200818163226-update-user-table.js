module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'username', {
    allowNull: false,
    type: Sequelize.STRING,
    after: 'name',
  }),

  down: (queryInterface) => queryInterface.removeColumn('Users', 'username'),

};
