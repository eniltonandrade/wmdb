module.exports = (sequelize, DataTypes) => {
  const MoviePerson = sequelize.define('MoviePerson', {
    character: DataTypes.STRING,
    order: DataTypes.INTEGER,
    role: DataTypes.INTEGER
  },{
    timestamps: false
  });

  return MoviePerson;
};
