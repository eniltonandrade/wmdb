const sequelize = require('sequelize');
const jwt = require('../libs/jwt');
const {
  Movie, Genre, Person, Company, User,
} = require('../models');

const associate = async (req, res) => {
  try {
    const user = await jwt.userIdfromToken(req);
    const {
      watchedAt, cast, genres, directors, companies, ...data
    } = req.body;

    const [movie, created] = await Movie.findOrCreate({
      where: { tmdbId: data.tmdbId },
      defaults: data,
    });

    movie.addUser(user, { through: { watchedAt } });

    if (user && created) {
      cast.forEach(async (el) => {
        const [person] = await Person.findOrCreate({
          where: { tmdbId: el.tmdbId },
          defaults: el,
        });
        movie.addPerson(person.id, {
          through: { order: el.order, character: el.character, role: '1' },
        });
      });

      directors.forEach(async (el) => {
        const [director] = await Person.findOrCreate({
          where: { tmdbId: el.tmdbId },
          defaults: el,
        });
        movie.addPerson(director.id, {
          through: { order: null, character: null, role: '2' },
        });
      });

      genres.forEach(async (el) => {
        const [genre] = await Genre.findOrCreate({
          where: { name: el.name },
          defaults: el,
        });
        movie.addGenre(genre.id);
      });

      companies.forEach(async (el) => {
        const [company] = await Company.findOrCreate({
          where: { tmdbId: el.tmdbId },
          defaults: el,
        });
        movie.addCompany(company.id);
      });
    }

    return res.status(200).json(movie);
  } catch (err) {
    return res.json(err);
  }
};

const listAll = async (req, res) => {
  const userId = await jwt.userIdfromToken(req);
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const movies = await user.getMovies({
      limit: +limit,
      offset: +offset,
      order: [[sequelize.col('UserMovies.watchedAt'), 'DESC']],
    });
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const get = async (req, res) => {
  const userId = await jwt.userIdfromToken(req);
  const { tmdbId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const movie = await user.getMovies({ where: { tmdbId } });
    if (movie && movie.length > 0) {
      return res.status(200).json({
        datetime: movie[0].UserMovies.watchedAt,
      });
    }
    return res.status(404).json({
      status: false,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  const userId = await jwt.userIdfromToken(req);
  const { tmdbId } = req.params;
  try {
    const movie = await Movie.findOne({ where: { tmdbId } });
    const user = await User.findOne({ where: { id: userId } });
    const result = await movie.removeUsers(user);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTimeWatched = async (req, res) => {
  const userId = await jwt.userIdfromToken(req);
  try {
    const totalRunTime = await Movie.sum('runtime', {
      includeIgnoreAttributes: false,
      include: [{ model: User, where: { id: userId }, through: { attributes: [] } }],
    });

    const months = Math.floor(totalRunTime / 43800);
    const days = Math.floor((totalRunTime % 43800) / 1440);
    const hours = Math.floor(((totalRunTime % 43800) % 1440) / 60);
    const minutes = Math.floor(totalRunTime % 60);

    res.status(200).json({
      months,
      days,
      hours,
      minutes,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
};

const getCountByDayOfWeek = async (req, res) => {
  const userId = await jwt.userIdfromToken(req);

  try {
    const result = await User.findAll({
      includeIgnoreAttributes: false,
      raw: true,
      attributes: [
        [Movie.sequelize.fn('dayofweek', sequelize.col('watchedAt')), 'dayofweek'],
        [Movie.sequelize.fn('COUNT', Movie.sequelize.col('MovieId')), 'total'],
      ],
      where: { id: userId },
      include: [{ model: Movie, attributes: [] }],
      group: sequelize.fn('dayofweek', sequelize.col('watchedAt')),
      order: [[sequelize.col('dayofweek'), 'ASC']],

    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  associate,
  listAll,
  get,
  remove,
  getTimeWatched,
  getCountByDayOfWeek,
};
