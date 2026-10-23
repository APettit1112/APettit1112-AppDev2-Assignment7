import { createContext, useState } from 'react';

export const MovieContext = createContext(null);

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

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
