import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [searchParam, setSearchParam] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchParam.trim()) {

            navigate(`/search?query=${searchParam}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a className="navbar-brand" href="#">Heading</a>

                <div className="navbar-desktop" id="navbarSupportedContent">
                    <ul className="navbar-links">
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/movies'>Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/showtimes'>Showtimes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/'>Extra?</Link>
                        </li>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchParam}
                                onChange={(e) => setSearchParam(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchSubmit(e);
                                    }
                                }}
                            />
                        </form>
                        <li className="nav-item">
                            <button className='navbar-button' onClick={() => navigate('/signin')}>Sign In</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
