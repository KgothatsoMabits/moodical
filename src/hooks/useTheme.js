import { useEffect } from 'react';

/**
 * useTheme: when called with a mood id it sets body.className
 * (Used in components to change overall theme)
 */
export default function useTheme(mood) {
  useEffect(() => {
    if (!mood) {
      document.body.className = 'neutral';
      return;
    }
    document.body.className = mood;
  }, [mood]);
}
