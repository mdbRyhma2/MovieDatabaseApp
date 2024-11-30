import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import Genre from '../utlis.js/Genre';
import './Search.css';

export default function Search() {
    const [keywords, setKeywords] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    

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
        { id: 37, name: 'Western' },
    ];

    const [tempSelectedGenres, setTempSelectedGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isAllGenresSelected, setIsAllGenresSelected] = useState(false);

    const [tempMinReleaseYear, setTempMinReleaseYear] = useState(1900);
    const [tempMaxReleaseYear, setTempMaxReleaseYear] = useState(2024);
    const [minReleaseYear, setMinReleaseYear] = useState(2024);
    const [maxReleaseYear, setMaxReleaseYear] = useState(2024);

    const location = useLocation();
    const { filteredMovies } = useMovies(searchQuery, minReleaseYear, maxReleaseYear, selectedGenres);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
      
        if (query) {
          setKeywords(query); // Display query in the search bar
          setSearchQuery(query); // Trigger search with this query
        } else {
          setKeywords('');
          setSearchQuery('');
          setTempSelectedGenres([]);
          setSelectedGenres([]);
          setTempMinReleaseYear(1900); // Reset filters
          setTempMaxReleaseYear(2024);
        }
      }, [location]);
      


    const handleKeyWordsChange = (e) => {
        setKeywords(e.target.value);
    };

    const handleSearchButtonClick = () => {

        setSearchQuery(keywords.trim() || '');
        setSelectedGenres([...tempSelectedGenres]);
        setMinReleaseYear(tempMinReleaseYear);
        setMaxReleaseYear(tempMaxReleaseYear);
    };



    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);
        setTempSelectedGenres((prevTempGenres) => {
            if (e.target.checked) {
                return [...prevTempGenres, genreId];
            } else {
                return prevTempGenres.filter((id) => id !== genreId);
            }
        });
    };

    const handleAllGenresChange = (e) => {
        if (e.target.checked) {
            setTempSelectedGenres(genres.map((genre) => genre.id));
            setIsAllGenresSelected(true);
        } else {
            setTempSelectedGenres([]);
            setIsAllGenresSelected(false);
        }
    };

    const handleMinYearSliderChange = (e) => {
        setTempMinReleaseYear(parseInt(e.target.value));
    };

    const handleMaxYearSliderChange = (e) => {
        setTempMaxReleaseYear(parseInt(e.target.value));
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
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="filter">
                    <label>Release year range:</label>
                    <div>
                        <label>Min Year: {tempMinReleaseYear}</label>
                        <input
                            type="range"
                            min="1900"
                            max="2024"
                            step="1"
                            value={tempMinReleaseYear}
                            onChange={handleMinYearSliderChange}
                        />
                    </div>
                    <div>
                        <label>Max Year: {tempMaxReleaseYear}</label>
                        <input
                            type="range"
                            min="1900"
                            max="2024"
                            step="1"
                            value={tempMaxReleaseYear}
                            onChange={handleMaxYearSliderChange}
                        />
                    </div>
                </div>

                <div className="genreList">
                    <label>
                        <input
                            type="checkbox"
                            value="all"
                            checked={isAllGenresSelected}
                            onChange={handleAllGenresChange}
                        />
                        All
                    </label>
                    {genres.map((item) => (
                        <Genre
                            key={item.id}
                            item={item}
                            checked={tempSelectedGenres.includes(item.id)}
                            onChange={handleGenreChange}
                        />
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
                                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                                <p>{movie.overview}</p>
                                <p>Release Date: {movie.release_date}</p>
                                {movie.poster_path ? (
                                    <Link to={`/movie/${movie.id}`}>                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Link>

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
