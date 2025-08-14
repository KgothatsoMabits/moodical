// src/components/MoodList.js
import React, { useState } from 'react';
import moods from '../data/moods';
import { getPlaylistsByMood } from '../api/spotify';

function MoodList() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleMoodClick(categoryId) {
    try {
      setLoading(true);
      const data = await getPlaylistsByMood(categoryId);
      setPlaylists(data.playlists.items);
    } catch (err) {
      console.error('Error fetching playlists:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Select Your Mood</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {moods.map(mood => (
          <div
            key={mood.id}
            onClick={() => handleMoodClick(mood.categoryId)}
            style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '1rem' }}
          >
            <img src={mood.image} alt={mood.label} width={120} height={120} />
            <h3>{mood.label}</h3>
            <p>{mood.desc}</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading playlists...</p>}

      {!loading && playlists.length > 0 && (
        <div>
          <h2>Playlists</h2>
          <ul>
            {playlists.map(pl => (
              <li key={pl.id}>
                <img src={pl.images[0]?.url} alt={pl.name} width={100} />
                <p>{pl.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MoodList;
