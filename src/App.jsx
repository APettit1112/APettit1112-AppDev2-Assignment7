import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { MovieProvider } from './contexts/MovieContext';
import './App.css';

function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem('favorites');
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    return {
      movies: Array.isArray(parsedFavorites) ? parsedFavorites : [],
      error: '',
    };
  } catch {
    return { movies: [], error: 'Unable to load saved favorites from this browser.' };
  }
}

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [initialFavorites] = useState(loadFavorites);
  const [favoriteMovies, setFavoriteMovies] = useState(initialFavorites.movies);
  const [favoritesError, setFavoritesError] = useState(initialFavorites.error);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
      setFavoritesError('');
    } catch {
      setFavoritesError('Unable to save favorites in this browser.');
    }
  }, [favoriteMovies]);

  function toggleFavorite(movie) {
    setFavoriteMovies((currentFavorites) =>
      currentFavorites.some((favorite) => favorite.id === movie.id)
        ? currentFavorites.filter((favorite) => favorite.id !== movie.id)
        : [...currentFavorites, movie]
    );
  }

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header
            setSearchResults={setSearchResults}
            setSearchLoading={setSearchLoading}
            setSearchError={setSearchError}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchResults={searchResults}
                  searchLoading={searchLoading}
                  searchError={searchError}
                  favoriteMovies={favoriteMovies}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favoriteMovies={favoriteMovies}
                  favoritesError={favoritesError}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;