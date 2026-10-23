import { useEffect, useState } from 'react';
import { MovieContext } from './MovieContextValue';

function loadWatchlist() {
  try {
    const savedWatchlist = localStorage.getItem('watchlist');
    const parsedWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];

    if (!Array.isArray(parsedWatchlist)) {
      throw new Error('Saved watchlist must be an array.');
    }

    return parsedWatchlist;
  } catch (error) {
    console.error('Unable to load saved watchlist from this browser.', error);
    return [];
  }
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(loadWatchlist);

  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('Unable to save watchlist in this browser.', error);
    }
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.some((watchlistMovie) => watchlistMovie.id === movie.id)
        ? currentWatchlist
        : [...currentWatchlist, movie]
    );
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId)
    );
  }

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
}
