import ErrorMessage from '../components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';

function Favorites({ favoriteMovies, favoritesError, onToggleFavorite }) {
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favoritesError && <ErrorMessage message={favoritesError} />}
      {favoriteMovies.length > 0 ? (
        <MovieGrid
          movies={favoriteMovies}
          favoriteMovies={favoriteMovies}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;