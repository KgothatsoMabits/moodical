import React, { useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import Loader from "../components/Loader";
import MoodCard from "../components/MoodCard";
import { fetchPlaylistsByCategory, fetchCategories } from "../services/api"; 
import moods from "../data/moods"; 
import "../styles/global.css";

export default function Home() {
  const [selected, setSelected] = useState(null); 
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
    
      const handleSelect = async (mood) => {
        // The mood object uses 'label', not 'name'. Let's check for that instead.
        if (!mood || !mood.label) {
          console.error("handleSelect called with invalid mood:", mood);
          return;
        }

        setSelected(mood.id);
        document.body.className = mood.id;
    
        setLoading(true);
        try {
          const availableCategories = await fetchCategories();
      
          // Find a category where Spotify's 'name' matches our mood's 'label'
          const spotifyCategory = availableCategories.find(
            c => c && c.name && c.name.toLowerCase() === mood.label.toLowerCase()
          );

          if (spotifyCategory) {
            const results = await fetchPlaylistsByCategory(spotifyCategory.id);
        setPlaylists(results || []);
      } else {
        // This log will now be more accurate
        console.warn(`Spotify category named '${mood.name}' not found. Trying a fallback.`);
        setPlaylists([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch playlists:", err);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Mood selection */}
      <section className="bg-white shadow-sm py-8 rounded-lg max-w-5xl mx-auto px-6 my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Select Your Mood
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-center">
          Pick the mood that best matches how you feel today — we'll suggest playlists for it.
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {moods.map((mood) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              onSelect={() => handleSelect(mood)} // pass Spotify category ID
              selected={selected}
            />
          ))}
        </div>
      </section>

      {/* Playlist results */}
      <main className="max-w-5xl mx-auto px-6 pb-16">
        {loading && <Loader />}

        {!loading && selected && (
          <>
            <h2 className="text-xl font-semibold mb-6 text-center">
              Playlists for {moods.find((m) => m.id === selected)?.label || selected}
            </h2>

            {playlists.length === 0 ? (
              <p className="text-slate-500 text-center">
                No playlists found — try another mood.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !selected && (
          <div className="py-16 text-center text-slate-600">
            Pick a mood above to get playlist suggestions.
          </div>
        )}
      </main>
    </div>
  );
}
