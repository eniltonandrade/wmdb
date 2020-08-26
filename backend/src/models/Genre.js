module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING,
    tmdbId: DataTypes.INTEGER
  });

  Genre.associate = models => {
    Genre.belongsToMany(models.Movie, {
      through: 'MovieGenres',
      foreignKey: 'genreId'
    });
  };

  return Genre;
};
