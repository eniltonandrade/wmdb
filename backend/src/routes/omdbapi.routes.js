const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = process.env.PROD ? 'https://www.omdbapi.com/?' : 'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?';

router.get('/ratings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const params = new URLSearchParams({
      apikey: 'c4eb5528',
      i: id,
    });
    const { data } = await axios.get(`${BASE_URL}${params}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const { imdbID, Title, Ratings } = data;
    return res.json({ imdbID, Title, Ratings });
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;
