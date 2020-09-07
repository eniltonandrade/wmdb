const axios = require('axios');

const api = (param) => axios.create({
  baseURL: `https://api.themoviedb.org/3/${param}?`,
});

module.exports = api;
