import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      navigate(`/search?query=${searchParam}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
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
              <Link className="nav-link" to="/">
                Extra?
              </Link>
            </li>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit(e);
                  }
                }}
              />
            </form>
            <li className="nav-item">
              {user ? (
                <button className="navbar-button logout-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="navbar-button" onClick={() => navigate("/auth")}>
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
