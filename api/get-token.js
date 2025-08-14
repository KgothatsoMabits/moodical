// api/get-token.js
// Vercel-style serverless function (CommonJS)
// Requires process.env.SPOTIFY_CLIENT_ID and process.env.SPOTIFY_CLIENT_SECRET to be set in your hosting env

const axios = require('axios');

let cached = {
  token: null,
  expiresAt: 0
};

module.exports = async function (req, res) {
  try {
    // If cached token is valid, return it
    const now = Date.now();
    if (cached.token && now < cached.expiresAt - 30000) { // 30s buffer
      return res.json({ access_token: cached.token, expires_in: Math.floor((cached.expiresAt - now) / 1000) });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Missing server environment variables SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET' });
    }

    const tokenResp = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: { username: clientId, password: clientSecret },
      data: 'grant_type=client_credentials'
    });

    const { access_token, expires_in } = tokenResp.data;
    cached.token = access_token;
    cached.expiresAt = Date.now() + expires_in * 1000;

    return res.json({ access_token, expires_in });
  } catch (err) {
    console.error('get-token error', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to fetch Spotify token' });
  }
};
