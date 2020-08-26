'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    tmdbId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    logo_path: DataTypes.STRING
  }, {});
  Company.associate = models => {
    Company.belongsToMany(models.Movie, {
      through: 'MovieCompanies',
      foreignKey: 'companyId'
    });
  };
  return Company;
};