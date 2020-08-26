module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    original_title: DataTypes.STRING,
    imdbId: DataTypes.STRING,
    tmdbId: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    release_date: DataTypes.DATE,
    vote_average: DataTypes.DOUBLE,
    runtime: DataTypes.INTEGER
  });

  Movie.associate = models => {
    Movie.belongsToMany(models.User, {
      through: models.UserMovies
    });
    Movie.belongsToMany(models.Person, {
      through: models.MoviePerson
    });
    Movie.belongsToMany(models.Genre, {
      through: 'MovieGenres',
      foreignKey: 'movieId'
    });
    Movie.belongsToMany(models.Company, {
      through: 'MovieCompanies',
      foreignKey: 'movieId'
    });
  };

  return Movie;
};
