import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
/* import "./Navbar.css";
 */ import { useUser } from "../context/useUser";
import searchIcon from "../images/search.png";

export default function Navbar() {
  const { user, logOut } = useUser(); // Accessing user data and the setter function
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchParam(query);
      navigate(location.pathname, { replace: true }); // Tyhjennetään edellinen haku enpointista
    }
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      // Navigate to Search.js with the query
      navigate(`/search?query=${encodeURIComponent(searchParam)}`);
    }
  };

  const handleAdvancedSearch = () => {
    navigate("/search");
  };

  const handleLogout = () => {
    logOut(); // Call the logOut function from the context
    navigate("/"); // Redirect to the homepage after logout
  };

  /* return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="/">
          Movie App
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
                <>
                <button className="navbar-button" onClick={() => navigate("/profile")}>
                  Profile
                </button>
                <button className="navbar-button" onClick={handleLogout}>
                  Log Out
                </button>
                </>
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
  ); */

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        Movie App
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/showtimes">
              Showtimes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/groups">
              Groups
            </a>
          </li>
          {/* <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form> */}
          {user.token ? (
            <>
              <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.username}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
              </ul>
            </li>
            </>
          ) : (
            <li class="nav-item">
            <a class="nav-link" href="/login">
              Login
            </a>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
