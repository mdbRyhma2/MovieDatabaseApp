import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/useUser";
import searchIcon from "../images/search.png";


export default function Navbar() {
  const { user, setUser } = useUser(); // Accessing user data and the setter function
  const [searchParam, setSearchParam] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      // Navigate to Search.js with the query
      navigate(`/search?query=${searchParam}`);
    }
  };

  const handleAdvancedSearch = () => {
    // Navigate to Search.js with no prefilled parameters
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
