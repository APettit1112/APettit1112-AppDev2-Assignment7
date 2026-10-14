import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Popular Movies</h2>
        <p>Discover and save your favorite films</p>
      </div>
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p role="alert">Unable to load movies: {error}</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
};

export default Home;