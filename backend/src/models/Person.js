module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
    tmdbId: DataTypes.INTEGER,
    profile_path: DataTypes.STRING,
    gender: DataTypes.INTEGER,
  });

  Person.associate = (models) => {
    Person.belongsToMany(models.Movie, {
      through: models.MoviePerson,
    });
  };

  return Person;
};
