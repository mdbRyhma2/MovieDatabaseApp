import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMovies } from '../hooks/useMovies'
import Genre from '../utlis.js/Genre'
import './Search.css'

export default function Search() {
    const [keywords, setKeywords] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const genres = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' }
    ]

    const [selectedGenres, setSelectedGenres] = useState([])

    const [movieLength, setMovieLength] = useState(180)

    const [minReleaseYear, setMinReleaseYear] = useState(1900)
    const [maxReleaseYear, setMaxReleaseYear] = useState(2024)

    const location = useLocation()

    const { filteredMovies } = useMovies(searchQuery, minReleaseYear, maxReleaseYear, selectedGenres, movieLength)

    useEffect(() => {

        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setKeywords(query)
            setSearchQuery(query)
        }
    }, [location]);



    const handleSliderChange = (e) => {
        setMovieLength(e.target.value)
    };

    const handleMinYearSliderChange = (e) => {
        setMinReleaseYear(e.target.value)
    };

    const handleMaxYearSliderChange = (e) => {
        setMaxReleaseYear(e.target.value)
    };

    const handleKeyWordsChange = (e) => {
        setKeywords(e.target.value)
    };

    const handleSearchButtonClick = () => {
        setSearchQuery(keywords)
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchQuery(keywords)
        }
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value)
        setSelectedGenres((prevSelectedGenres) => {
            if (e.target.checked) {

                return [...prevSelectedGenres, genreId]
            } else {

                return prevSelectedGenres.filter(id => id !== genreId)
            }
        })
    }

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
                        onKeyDown={handleKeyDown}
                    />
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

                <div className='genreList'>
                        {genres.map((item) => (
                            <Genre key={item.id} item={item}  checked={selectedGenres.includes(item.id)}onChange={handleGenreChange} />
                        ))}
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
