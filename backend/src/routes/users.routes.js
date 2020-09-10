const express = require('express');
const { index } = require('../controllers/users');
const {
  associate, listAll, get, remove, getTimeWatched, getCountByDayOfWeek, getTotalMovies,
} = require('../controllers/userMovies');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/', index);
router.post('/movies/associeate', checkAuth, associate);
router.get('/movies', checkAuth, listAll);
router.get('/movies/:tmdbId', checkAuth, get);
router.get('/movies/stats/totalTimeWatched', checkAuth, getTimeWatched);
router.get('/movies/stats/countByDayOfWeek', checkAuth, getCountByDayOfWeek);
router.get('/movies/stats/totalMovies', checkAuth, getTotalMovies);
router.delete('/movies/:tmdbId', checkAuth, remove);

module.exports = router;
