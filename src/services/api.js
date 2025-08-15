import axios from 'axios';

const moodToCategory = {
  Happy: "pop",
  Sad: "sleep",
  Energetic: "workout",
  Calm: "chill",
  Motivational: "focus",
  Bright: "party",
  Melancholic: "romance"
};

// Function to get the Spotify token from our backend
const getSpotifyToken = async () => {
  try {
    const response = await axios.get('/api/spotify/token');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
  }
};

export const fetchPlaylistsByCategory = async (categoryId) => {
  const token = await getSpotifyToken();
  if (!token) {
    console.error('Could not retrieve Spotify token.');
    return;
  }

  try {
    // Add country parameter to the request for better results
    const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=US`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.playlists.items;
  } catch (error) {
    console.error('Error fetching playlists:', error);
  }
};

// New function to get all available categories from Spotify
export const fetchCategories = async () => {
  const token = await getSpotifyToken();
  if (!token) {
    console.error('Could not retrieve Spotify token.');
    return [];
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/categories?country=US&limit=50', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.categories.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export async function fetchPlaylistsByMood(mood, accessToken) {
  const categoryId = moodToCategory[mood];
  if (!categoryId) {
    console.error("No category ID found for mood:", mood);
    return [];
  }

  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=US`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error("Spotify API error:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.playlists.items || [];
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}