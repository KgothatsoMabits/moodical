// src/services/api.js
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN; 
// Make sure you have this set in your .env file

/**
 * Fetch playlists from a Spotify category
 * @param {string} categoryId - The Spotify category ID (e.g., "mood", "party")
 * @returns {Promise<Array>} - Array of playlist objects
 */
export async function fetchPlaylistsByCategory(categoryId) {
  try {
    const response = await fetch(
      `${SPOTIFY_BASE_URL}/browse/categories/${categoryId}/playlists?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching playlists:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.playlists.items || [];
  } catch (err) {
    console.error("Error in fetchPlaylistsByCategory:", err);
    return [];
  }
}

/**
 * Optionally fetch available Spotify categories
 * @returns {Promise<Array>} - Array of category objects
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${SPOTIFY_BASE_URL}/browse/categories?limit=20`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error fetching categories:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.categories.items || [];
  } catch (err) {
    console.error("Error in fetchCategories:", err);
    return [];
  }
}
