import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchLoading, searchError, favoriteMovies, onToggleFavorite }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const isSearching = searchResults !== null;
  const displayedMovies = isSearching ? searchResults : movies;

  useEffect(() => {
    let isCurrent = true;

    async function fetchMovies() {
      try {
        const data = await getPopularMovies();
        if (isCurrent) {
          setMovies(data.results);
        }
      } catch (requestError) {
        if (isCurrent) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load movies.');
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    fetchMovies();
    return () => {
      isCurrent = false;
    };
  }, [reloadCount]);

  function retryPopularMovies() {
    setError('');
    setLoading(true);
    setReloadCount((currentCount) => currentCount + 1);
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      {isSearching && searchLoading ? (
        <LoadingSpinner message="Searching movies..." />
      ) : isSearching && searchError ? (
        <ErrorMessage message={`Unable to search movies: ${searchError}`} />
      ) : !isSearching && loading ? (
        <LoadingSpinner message="Loading movies..." />
      ) : !isSearching && error ? (
        <ErrorMessage message={`Unable to load movies: ${error}`} onRetry={retryPopularMovies} />
      ) : isSearching && displayedMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <MovieGrid
          movies={displayedMovies}
          favoriteMovies={favoriteMovies}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </main>
  );
};

export default Home;