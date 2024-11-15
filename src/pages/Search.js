import React from 'react';
import { useState } from 'react';
import './Search.css';

export default function Search() {
    //Movie length slider
    const [movieLength, setMovielength] = useState(180);//Default 180minutes (3hours)
    //Handler for slider change
    const handleSliderChange = (event) => {
        setMovielength(event.target.value);
    }
    return (
        <aside className="search-filter">
      <h2>Search movies</h2>
      <div className="filter">
        <label htmlFor="title">Title name</label>
        <input type="text" id="title" placeholder="Movie name" />
      </div>
      <div className="filter">
        <h3>Genre</h3>
        <div className="checkbox-group">
          <label><input type="checkbox" /> Genre 1</label>
          <label><input type="checkbox" /> Genre 2</label>
          <label><input type="checkbox" /> Genre 3</label>
          <label><input type="checkbox" /> Genre 4</label>
        </div>
      </div>
      <div className="filter">
        <label>Movie length: {movieLength} min</label>
        <input 
            type="range" 
            min="0" 
            max="240" 
            step="5" 
            value={movieLength}
            onChange={handleSliderChange} 
        />
      </div>
      <button className="search-button">Search</button>
    </aside>

    )
}