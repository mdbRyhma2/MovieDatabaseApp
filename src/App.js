import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Movies from './pages/Movies';
import GreateAcc from './pages/GreateAcc';

export default function App() {
    return (
    <div style={{ paddingTop: '6rem' }}>
        <Navbar />
        <Header />
        
        <Routes>
            <Route path='/' exact element={<Home />} />
        </Routes>


        
    </div>
    )
}