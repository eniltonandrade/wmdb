const express = require('express');
const auth = require('./auth.routes');
const users = require('./users.routes');
const tmdb = require('./tmdb.routes');
const omdb = require('./omdbapi.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'WMDB API v2',
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/tmdb', tmdb);
router.use('/imdb', omdb);

module.exports = router;
