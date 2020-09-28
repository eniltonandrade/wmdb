const express = require('express');
const { update, get } = require('../controllers/movies');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.put('/:id', checkAuth, update);
router.get('/:id', checkAuth, get);

module.exports = router;
