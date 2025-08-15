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

export const fetchPlaylistsByCategory = async (categoryId) => {
  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { country: 'US', limit: 5 },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.error(`Error fetching playlists for category ${categoryId}:`, error.message);
    return []; 
  }
};

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