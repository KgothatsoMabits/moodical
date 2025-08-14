// api/search.js
const axios = require('axios');

async function getToken(req) {
  const origin = req.headers['x-forwarded-proto'] ? `${req.headers['x-forwarded-proto']}://${req.headers.host}` : '';
  const tokenUrl = origin ? `${origin}/api/get-token` : null;

  if (!tokenUrl) {
    if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
      const tokenResp = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        auth: { username: clientId, password: clientSecret },
        data: 'grant_type=client_credentials',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return tokenResp.data.access_token;
    }
    throw new Error('No token endpoint available and no local credentials');
  }

  const tokenResp = await axios.get(tokenUrl);
  return tokenResp.data.access_token;
}

module.exports = async function (req, res) {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Missing q param' });

    const token = await getToken(req);
    const resp = await axios.get('https://api.spotify.com/v1/search', {
      params: { q, type: 'playlist', limit: 20 },
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.json(resp.data);
  } catch (err) {
    console.error('search error', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Search failed' });
  }
};
