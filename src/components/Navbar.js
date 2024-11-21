import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/useUser";


export default function Navbar() {
  const { user, setUser } = useUser(); // Accessing user data and the setter function
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      navigate(`/search?query=${searchParam}`);
    }
  };

  // Function for logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser({ email: "", password: "" });
    navigate("/");
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
                   <button className='navbar-button' onClick={() => navigate('/search')}>Advanced search</button>
                </li>
            {/* Button for login and logout*/}
            <li className="nav-item">
              {user.token ? (
                <button className="navbar-button" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <button className="navbar-button" onClick={() => navigate("/login")}>
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
