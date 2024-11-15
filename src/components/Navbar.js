import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav class="desktop-nav">
            <div class="title">Movie page</div>
            <div class="navbar">
                <ul class="navbar-links">
                    <li class="nav-item">
                        <Link className='nav-link' to='/'>Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to='/movies'>Movies</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to='/Showtimes'>Showtimes</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to='/Search'>Search</Link>
                    </li>
                </ul>
            </div>
            <div class="search-container">
                <input type="text" placeholder="Search..."></input>
            </div>
            <div class="sign-button">
                <li class="button">
                    <Link className='link-button' to='/LogIn'>LogIn</Link>
                </li>
            </div>
        </nav>
    )
}