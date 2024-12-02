import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/useUser";
import searchIcon from "../images/search.png";


export default function Navbar() {
  const { user, setUser } = useUser(); // Accessing user data and the setter function
  const [searchParam, setSearchParam] = useState('');
  const navigate = useNavigate();
  const location = useLocation()

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      // Navigate to Search.js with the query
      navigate(`/search?query=${encodeURIComponent(searchParam)}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchParam(query); 
      navigate(location.pathname, { replace: true }) // Tyhjennetään edellinen haku enpointista
    }
  }, [location]);

  const handleAdvancedSearch = () => {
    navigate('/search');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser({ email: '', password: '' });
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="#">
          Heading
        </a>
        <div className="navbar-desktop" id="navbarSupportedContent">
          <ul className="navbar-links">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/showtimes">
                Showtimes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groups">
                Groups
              </Link>
            </li>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              />
              <button className="navbar-button" type="submit">Search</button>
            </form>
            <li className="nav-item">
              <button className="navbar-button" onClick={handleAdvancedSearch}>
                Advanced Search
              </button>
            </li>
            <li className="nav-item">
              {user.token ? (
                <button className="navbar-button" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <button className="navbar-button" onClick={() => navigate('/login')}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}