const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/api/token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Spotify Token Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Spotify token' });
  }
});

module.exports = app;