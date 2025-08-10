import React, { useState } from 'react';
import MoodCard from '../components/MoodCard';
import PlaylistCard from '../components/PlaylistCard';
import Loader from '../components/Loader';
import fetchPlaylists from '../services/api';

const moods = [
  { id:'happy', label:'Happy', desc:'Bright & upbeat', image:'/src/assets/moods/happy.png' },
  { id:'sad', label:'Sad', desc:'Melancholic', image:'/src/assets/moods/sad.png' },
  { id:'energetic', label:'Energetic', desc:'High-energy', image:'/src/assets/moods/energetic.png' },
  { id:'calm', label:'Calm', desc:'Soft & chill', image:'/src/assets/moods/calm.png' }
];

export default function Home(){
  const [selected, setSelected] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (id) => {
    setSelected(id);
    document.body.className = id; // theme switch
    setLoading(true);
    const res = await fetchPlaylists(id);
    setPlaylists(res);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-1">How are you feeling today?</h1>
      <p className="text-slate-600 mb-6">Choose a mood and we’ll suggest playlists.</p>

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8">
        {moods.map(m => <MoodCard key={m.id} mood={m} onSelect={handleSelect} />)}
      </section>

      <section>
        {loading && <Loader />}
        {!loading && selected && (
          <>
            <h2 className="text-xl font-semibold mb-3">Playlists for {selected}</h2>
            {playlists.length === 0 ? (
              <p className="text-slate-500">No playlists found — try another mood.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {playlists.map(p => <PlaylistCard key={p.id} playlist={p} />)}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
