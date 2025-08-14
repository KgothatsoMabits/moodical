// api/categories/[id].js
const axios = require('axios');

async function getServerToken(req) {
  const origin = req.headers['x-forwarded-proto'] ? `${req.headers['x-forwarded-proto']}://${req.headers.host}` : '';
  const tokenUrl = origin ? `${origin}/api/get-token` : null;

  if (!tokenUrl) {
    if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
      const tokenResp = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        auth: { username: clientId, password: clientSecret },
        data: 'grant_type=client_credentials'
      });
      return tokenResp.data.access_token;
    }
    throw new Error('No token endpoint available and no local credentials');
  }

  const tokenResp = await axios.get(`${tokenUrl}`);
  return tokenResp.data.access_token;
}

module.exports = async function (req, res) {
  try {
    const categoryId = req.query.id || (req.url && req.url.split('/').pop());
    if (!categoryId) return res.status(400).json({ error: 'Missing category id' });

    const access_token = await getServerToken(req);
    const params = { limit: 20 };
    const resp = await axios.get(`https://api.spotify.com/v1/browse/categories/${encodeURIComponent(categoryId)}/playlists`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params
    });

    // return playlists object
    return res.json(resp.data);
  } catch (err) {
    console.error('category playlists error', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to fetch category playlists' });
  }
};
