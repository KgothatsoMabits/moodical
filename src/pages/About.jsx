import React from 'react';

export default function About() {
  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <h1>About MOODICAL</h1>
      <p style={{ color:'var(--muted)' }}>
        MOODICAL matches moods to playlists. This demo shows how emotion-based UI and
        API integration can create a more intuitive music discovery experience.
      </p>

      <h3 style={{ marginTop: '1.25rem' }}>How it works</h3>
      <ol>
        <li>Pick a mood (Happy, Sad, Energetic, Calm).</li>
        <li>The app searches for playlists matching that mood (Spotify) or falls back to curated mock data.</li>
        <li>Enjoy — open a playlist on Spotify if you have access.</li>
      </ol>
    </div>
  );
}
