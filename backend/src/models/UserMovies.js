module.exports = (sequelize, DataTypes) => {
  const UserMovies = sequelize.define('UserMovies', {
    watchedAt: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  return UserMovies;
};
