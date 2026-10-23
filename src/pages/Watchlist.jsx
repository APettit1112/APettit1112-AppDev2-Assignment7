import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContextValue';

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useContext(MovieContext);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch</p>
      </div>
      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="movie-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-details">
                  <span className="movie-rating">⭐ {movie.vote_average}</span>
                  <span className="movie-year">
                    {movie.release_date?.slice(0, 4) || 'Release year unavailable'}
                  </span>
                </div>
                <button
                  className="favorite-button"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Add movies you want to watch!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
