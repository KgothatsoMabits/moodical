import axios from 'axios';
import { mockPlaylists } from './mockData';

/**
 * fetchPlaylists(mood)
 * - if VITE_SPOTIFY_TOKEN is provided, call Spotify Search API
 * - otherwise return mock data (fast fallback for demo)
 */
const SPOTIFY_TOKEN = import.meta.env.VITE_SPOTIFY_TOKEN || '';

export default async function fetchPlaylists(mood) {
  // small map from mood -> query
  const q = {
    happy: 'happy upbeat playlist',
    sad: 'sad slow playlist',
    energetic: 'workout energetic playlist',
    calm: 'calm chill playlist'
  }[mood] || mood;

  if (!SPOTIFY_TOKEN) {
    // return mock copy (simulate network latency)
    await new Promise(r => setTimeout(r, 400));
    return mockPlaylists[mood] || [];
  }

  try {
    const resp = await axios.get('https://api.spotify.com/v1/search', {
      params: { q, type: 'playlist', limit: 12 },
      headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` }
    });

    // return playlists array
    return resp.data.playlists?.items || [];
  } catch (err) {
    console.error('Spotify fetch error:', err?.response?.data || err.message);
    // fallback to mock if Spotify fails
    return mockPlaylists[mood] || [];
  }
}
