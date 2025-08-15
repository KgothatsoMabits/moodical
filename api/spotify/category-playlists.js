// api/spotify/category-playlists.js
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
  return resp.json(); // { access_token }
}

export default async function handler(req, res) {
  try {
    const categoryId = req.query.categoryId;
    const country = (req.query.country || "US").toUpperCase();
    const limit = Math.min(Number(req.query.limit || 12), 50);

    if (!categoryId) {
      return res.status(400).json({ error: "Missing categoryId" });
    }

    const { access_token } = await getAccessToken();

    const url = `https://api.spotify.com/v1/browse/categories/${encodeURIComponent(
      categoryId
    )}/playlists?country=${encodeURIComponent(country)}&limit=${limit}`;

    const apiResp = await fetch(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!apiResp.ok) {
      const text = await apiResp.text();
      return res.status(apiResp.status).json({ error: "Spotify playlists failed", detail: text });
    }

    const data = await apiResp.json();
    const playlists =
      data.playlists?.items?.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.images?.[0]?.url || "",
        url: p.external_urls?.spotify || "",
        owner: p.owner?.display_name || "",
        tracks: p.tracks?.total ?? 0,
      })) || [];

    return res.status(200).json({ playlists });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected playlists error" });
  }
}
