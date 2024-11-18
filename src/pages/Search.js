import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function Search() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [keywords, setKeywords] = useState('');
    const location = useLocation();

    const [movieLength, setMovielength] = useState(180); 
    const [minReleaseYear, setMinReleaseYear] = useState(1900);
    const [maxReleaseYear, setMaxReleaseYear] = useState(2024);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setKeywords(query)
            submitSearch()
        }
    }, [location]);



    const submitSearch = async () => {
        const params = {
            query: keywords,
        };

        const url = 'https://api.themoviedb.org/3/search/movie';
        if (keywords) {
            try {
                const response = await axios.get(url, {
                    headers: {
                        accept: 'application/json',
                        Authorization: process.env.REACT_APP_API_KEY,
                    },
                    params: params,
                });
                setMovies(response.data.results);
                filterMoviesByYear(response.data.results); 
            } catch (error) {
                console.log(error.message);
            }
        }
    };


    const filterMoviesByYear = (moviesList) => {
        const filtered = moviesList.filter(
            (movie) => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return releaseYear >= minReleaseYear && releaseYear <= maxReleaseYear;
            }
        );
        setFilteredMovies(filtered); 
    };

    const handleSliderChange = (e) => {
        setMovielength(e.target.value);
    };

    const handleMinYearSliderChange = (e) => {
        setMinReleaseYear(e.target.value);
        filterMoviesByYear(movies); 
    };

    const handleMaxYearSliderChange = (e) => {
        setMaxReleaseYear(e.target.value);
        filterMoviesByYear(movies); 
    };

    const handleKeyWordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleSearchButtonClick = () => {
        submitSearch();
    };

    return (
        <div>
            <aside className="search-filter">
                <h2>Search movies</h2>
                <div className="filter">
                    <label htmlFor="title">Title name</label>
                    <input
                        type="text"
                        id="keywords"
                        placeholder="Movie name"
                        value={keywords}
                        onChange={handleKeyWordsChange}
                    />
                </div>
                <div className="filter">
                    <h3>Genre</h3>
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" /> Genre 1
                        </label>
                        <label>
                            <input type="checkbox" /> Genre 2
                        </label>
                        <label>
                            <input type="checkbox" /> Genre 3
                        </label>
                        <label>
                            <input type="checkbox" /> Genre 4
                        </label>
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
                <div className="filter">
                    <label>Release year range:</label>
                    <div>
                        <label>Min Year: {minReleaseYear}</label>
                        <input
                            type="range"
                            min="1900"
                            max="2024"
                            step="1"
                            value={minReleaseYear}
                            onChange={handleMinYearSliderChange}
                        />
                    </div>
                    <div>
                        <label>Max Year: {maxReleaseYear}</label>
                        <input
                            type="range"
                            min="1900"
                            max="2024"
                            step="1"
                            value={maxReleaseYear}
                            onChange={handleMaxYearSliderChange}
                        />
                    </div>
                </div>
                <button className="search-button" onClick={handleSearchButtonClick}>
                    Search
                </button>
            </aside>

            <div id="container">
                <h3>Search Results</h3>
                {filteredMovies.length > 0 ? (
                    <ul>
                        {filteredMovies.map((movie) => (
                            <li key={movie.id}>
                                <h4>{movie.title}</h4>
                                <p>{movie.overview}</p>
                                <p>Release Date: {movie.release_date}</p>
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <p>No Image Available</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found for your search.</p>
                )}
            </div>
        </div>
    );
}
