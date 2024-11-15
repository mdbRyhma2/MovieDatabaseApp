import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Movies from './pages/Movies';
import Profile from './pages/Profile.js';
import Search from './pages/Search.js';
import Showtimes from './pages/Showtimes.js';
import SignUp from './pages/SignUp.js';
import Navbar from './components/Navbar.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

export default function App() {
    return (
    <>
        <Navbar />
        <Header />
        <div id="container">
            <Routes>
                <Route path="/home" exact element={<Home />}/>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/showtimes" element={<Showtimes />}/>
                <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </div>
        <Footer />
    </>
    )
}