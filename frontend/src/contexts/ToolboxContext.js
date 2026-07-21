import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ToolboxContext = createContext();

export const useToolbox = () => {
  const ctx = useContext(ToolboxContext);
  if (!ctx) throw new Error('useToolbox must be used within ToolboxProvider');
  return ctx;
};

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const ToolboxProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => load('tool127-favorites', []));
  const [recents, setRecents] = useState(() => load('tool127-recents', []));

  useEffect(() => {
    localStorage.setItem('tool127-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tool127-recents', JSON.stringify(recents));
  }, [recents]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const addRecent = useCallback((id) => {
    setRecents((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  return (
    <ToolboxContext.Provider value={{ favorites, recents, toggleFavorite, isFavorite, addRecent }}>
      {children}
    </ToolboxContext.Provider>
  );
};
