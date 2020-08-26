const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.json({ message: 'WMDB API' });
});

app.use('/api/v2/', routes);

module.exports = app;
