import React, { useState, useCallback } from 'react';
import MoodCard from '../components/MoodCard';
import PlaylistGrid from '../components/PlaylistGrid';
import { useSpotifyData } from '../hooks/useSpotifyData';
import { fetchPlaylistsByCategory, searchForPlaylists } from '../services/api';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';

export default function Home() {
  const { mappedMoods, isLoading: isLoadingCategories, error } = useSpotifyData();
  const [selectedMoodId, setSelectedMoodId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  const handleSelect = useCallback(async (mood) => {
    if (!mood.isAvailable) return;
    setSelectedMoodId(mood.id);
    setIsLoadingPlaylists(true);
    setPlaylists([]);
    try {
      let results = await fetchPlaylistsByCategory(mood.spotifyCategoryId);
      if (!results || results.length === 0) {
        results = await searchForPlaylists(mood.label);
      }
      setPlaylists(results);
    } catch (err) {
      console.error('An unexpected error occurred during playlist fetching:', err);
    } finally {
      setIsLoadingPlaylists(false);
    }
  }, []); 

  if (isLoadingCategories) {
    return <Loader message="Connecting to Spotify..." />;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <main>
      <header className="page-header">
        <h1 className="page-title">Find Your Vibe</h1>
        <p className="page-subtitle">
          Select a mood to discover curated playlists from Spotify.
        </p>
      </header>

      <div className="grid moods">
        {mappedMoods.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            onSelect={handleSelect}
            selected={selectedMoodId === mood.id}
            isAvailable={mood.isAvailable}
          />
        ))}
      </div>

      {isLoadingPlaylists ? (
        <Loader message="Finding your playlists..." />
      ) : (
        <PlaylistGrid playlists={playlists} />
      )}
    </main>
  );
}