module.exports = (sequelize, DataTypes) => {
  const UserMovies = sequelize.define(
    'MovieCast',
    {
      character: DataTypes.STRING,
      order: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );

  return UserMovies;
};
