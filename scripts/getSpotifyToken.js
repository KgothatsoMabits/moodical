/**
 * Usage:
 * 1) export SPOTIFY_CLIENT_ID="xxx"
 * 2) export SPOTIFY_CLIENT_SECRET="yyy"
 * 3) node scripts/getSpotifyToken.js
 *
 * It prints a Bearer token (valid for a short time).
 *
 * NOTE: Keep client secret safe — don't commit it.
 */

const axios = require('axios');

async function getToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your shell.');
    process.exit(1);
  }

  try {
    const resp = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      data: 'grant_type=client_credentials'
    });

    console.log('----- copy this token to your .env as VITE_SPOTIFY_TOKEN -----\n');
    console.log('TOKEN: ', resp.data.access_token);
    console.log('\nExpires in (seconds):', resp.data.expires_in);
  } catch (err) {
    console.error('Failed to fetch token:', err?.response?.data || err.message);
  }
}

getToken();
