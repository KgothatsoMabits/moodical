// api/spotify/categories.js
async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!resp.ok) throw new Error(`Token request failed: ${resp.status}`);
  return resp.json(); // { access_token, token_type, expires_in }
}

export default async function handler(req, res) {
  try {
    const country = (req.query.country || "US").toUpperCase();
    const limit = Number(req.query.limit || 50);

    const { access_token } = await getAccessToken();

    const apiResp = await fetch(
      `https://api.spotify.com/v1/browse/categories?country=${encodeURIComponent(country)}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!apiResp.ok) {
      const text = await apiResp.text();
      return res.status(apiResp.status).json({ error: "Spotify categories failed", detail: text });
    }

    const data = await apiResp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected categories error" });
  }
}
