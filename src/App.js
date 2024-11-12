import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';

export default function App() {
    return (
    <>
        <Navbar />
        <div id="container">
            <Routes>
                <Route path="/" exact element={<Home />}/>
            </Routes>
        </div>
    </>
    )
}