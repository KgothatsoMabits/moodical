async function getSpotifyToken() {
  const res = await fetch('http://localhost:5000/api/spotify/token');
  const data = await res.json();
  return data.access_token;
}

async function getPlaylistsByMood(moodCategoryId) {
  const token = await getSpotifyToken();
  const res = await fetch(`https://api.spotify.com/v1/browse/categories/${moodCategoryId}/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const playlists = await res.json();
  console.log(playlists);
}

getPlaylistsByMood('mood'); // Example: 'mood', 'workout', etc.
