const { User } = require('../models');

const index = async (req, res) => {
  try {
    const results = await User.findAll();
    return res.status(200).json({
      results,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  index,
};
