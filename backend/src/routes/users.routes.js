const express = require('express');
const { index } = require('../controllers/users');

const router = express.Router();

router.get('/', index);

module.exports = router;
