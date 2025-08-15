const axios = require('axios');

async function getToken() {
  const clientId = process.env.VITE.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.VITE.SPOTIFY_CLIENT_SECRET;

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
