
import { useState } from 'react';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = (prompt: string) => {
    if (prompt && prompt.trim()) {
      setSearchHistory(prev => [prompt, ...prev.slice(0, 4)]); // Keep last 5 searches
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory
  };
};
