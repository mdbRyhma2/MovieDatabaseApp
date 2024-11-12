import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav class="navbar">
            <div class="navbar-container">
                <a class="navbar-brand" href="#">Heading</a>

                <div class="navbar-desktop" id="navbarSupportedContent">
                    <ul class="navbar-links">
                        <li class="nav-item">
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/movies'>Movies</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/showtimes'>Showtimes</Link>
                        </li>
                        <li class="nav-item">
                            <Link className='nav-link' to='/'>Extra?</Link>
                        </li>
                        <input type="text" placeholder="Search..."></input>
                        <li class="nav-item">
                            <button className='navbar-button' onClick={() => navigate=('/signin')}>Sign In</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}