const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://api.themoviedb.org/3/';
const commonParams = {
  api_key: process.env.TMDB_KEY,
  language: 'pt-BR',
};
let source;

router.get('/search/:string', async (req, res) => {
  try {
    const query = req.params.string;
    const params = new URLSearchParams({
      ...commonParams,
      query,
      include_adult: false,
      region: 'BR',
    });
    if (source) {
      source.cancel();
    }
    source = axios.CancelToken.source();
    const { data } = await axios.get(`${BASE_URL}search/multi?${params}`, { cancelToken: source.token });
    return res.json(data);
  } catch (err) {
    if (axios.isCancel(err)) return false;
    return res.json({ message: err });
  }
});

router.get('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const params = new URLSearchParams({
      ...commonParams,
      append_to_response: 'casts',
    });
    const { data } = await axios.get(`${BASE_URL}movie/${id}?${params}`);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/movie/popular', async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...commonParams,
      region: 'BR',
      page: 1,
    });
    const { data } = await axios.get(`${BASE_URL}movie/popular?${params}`);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/person/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const params = new URLSearchParams({
      ...commonParams,
      append_to_response: 'movie_credits,images',
    });
    const { data } = await axios.get(`${BASE_URL}person/${id}?${params}`);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
