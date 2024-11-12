import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
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
                        <input type="text" placeholder="Search..."></input>
                        <li className="nav-item">
                            <button className='navbar-button' onClick={() => navigate=('/signin')}>Sign In</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}