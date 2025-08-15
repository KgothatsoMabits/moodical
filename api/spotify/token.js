// api/spotify/token.js
export default async function handler(req, res) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Missing Spotify credentials" });
    }

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResp.ok) {
      const text = await tokenResp.text();
      return res.status(500).json({ error: "Token request failed", detail: text });
    }

    const tokenJson = await tokenResp.json();
    return res.status(200).json(tokenJson);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected token error" });
  }
}
