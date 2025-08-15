import { useState, useEffect } from 'react';
import { moods as localMoods } from '../data/moods';
import { fetchAvailableCategories } from '../services/api';

export function useSpotifyData() {
  const [mappedMoods, setMappedMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mapMoodsToCategories = async () => {
      try {
        setIsLoading(true);
        const spotifyCategories = await fetchAvailableCategories();
        
        if (spotifyCategories.length === 0) {
          throw new Error('Could not connect to Spotify. Please try again later.');
        }

        const categoryMap = new Map(spotifyCategories.map(cat => [cat.name.toLowerCase(), cat.id]));

        const newMappedMoods = localMoods.map(mood => {
          const spotifyCategoryId = categoryMap.get(mood.label.toLowerCase());
          return {
            ...mood,
            spotifyCategoryId: spotifyCategoryId || null,
            isAvailable: !!spotifyCategoryId,
          };
        });

        setMappedMoods(newMappedMoods);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    mapMoodsToCategories();
  }, []); 

  return { mappedMoods, isLoading, error };
}