const express = require('express');
const { login, signup } = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'auth' });
});

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
