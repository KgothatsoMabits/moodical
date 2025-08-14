const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

// Route: Get Access Token
router.get('/token', async (req, res) => {
  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    res.json(data); // Send access token back to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Spotify token' });
  }
});

module.exports = router;
