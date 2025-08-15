const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios

// Route: Get Access Token
router.get('/token', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching token from Spotify' });
  }
});

module.exports = router;
