import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContextValue';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(MovieContext);
  const isInWatchlist = watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id);

  function toggleWatchlist() {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
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
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button
          className={`favorite-button${isFavorite ? ' favorited' : ''}`}
          onClick={() => onToggleFavorite(movie)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
        <button
          className={`watchlist-button${isInWatchlist ? ' in-watchlist' : ''}`}
          onClick={toggleWatchlist}
          aria-pressed={isInWatchlist}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;