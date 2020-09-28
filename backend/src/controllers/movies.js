const { Movie } = require('../models');

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) return res.status(404);
    const updated = await Movie.update(data, {
      where: {
        id,
      },
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({ where: { id } });
    if (!movie) return res.status(404).json({ message: 'not found' });
    return res.json(movie);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  update,
  get,
};
