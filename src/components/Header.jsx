import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults, setSearchLoading, setSearchError }) {
  const [query, setQuery] = useState('');
  const latestSearch = useRef(0);

  async function handleSearch(searchQuery) {
    const normalizedQuery = searchQuery.trim();

    if (!normalizedQuery) {
      latestSearch.current += 1;
      setSearchResults(null);
      setSearchLoading(false);
      setSearchError('');
      return;
    }

    const searchId = ++latestSearch.current;
    setSearchLoading(true);
    setSearchError('');

    try {
      const data = await searchMovies(normalizedQuery);
      if (searchId === latestSearch.current) {
        setSearchResults(data.results);
      }
    } catch (requestError) {
      if (searchId === latestSearch.current) {
        setSearchError(requestError instanceof Error ? requestError.message : 'Search failed.');
      }
    } finally {
      if (searchId === latestSearch.current) {
        setSearchLoading(false);
      }
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQuery(nextQuery);
              handleSearch(nextQuery);
            }}
          />
          <button className="search-button" onClick={() => handleSearch(query)}>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;