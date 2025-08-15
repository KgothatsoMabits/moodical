import axios from 'axios';

export const getSpotifyToken = async () => {
  try {
    const response = await axios.get('/api/token');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};

export const fetchAvailableCategories = async () => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
      headers: { Authorization: `Bearer ${token}` },
      params: { country: 'US', limit: 50 },
    });
    return response.data.categories.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export async function fetchPlaylistsByCategory(categoryId, opts = {}) {
  const params = new URLSearchParams({
    categoryId,
    country: opts.country || "US",
    limit: String(opts.limit || 12),
  });

  const resp = await fetch(`/api/spotify/category-playlists?${params.toString()}`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Playlists API failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  return data.playlists || [];
}

export async function fetchCategories({ country = "US", limit = 50 } = {}) {
  const params = new URLSearchParams({ country, limit: String(limit) });
  const resp = await fetch(`/api/spotify/categories?${params.toString()}`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Categories API failed: ${resp.status} ${text}`);
  }
  return resp.json(); 
}

export const searchForPlaylists = async (query) => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: 'playlist',
        market: 'US',
        limit: 5,
      },
    });
    return response.data.playlists.items;
  } catch (error) {
    console.error(`Error searching for playlists with query "${query}":`, error);
    return [];
  }
};