import { useEffect } from 'react';

export default function useTheme(mood) {
  useEffect(() => {
    if (!mood) {
      document.body.className = 'neutral';
      return;
    }
    document.body.className = mood;
  }, [mood]);
}
