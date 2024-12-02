import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import Genre from '../utlis.js/Genre';
import './Search.css';
import { Range } from 'react-range';

 //Muuttujat min ja max years
 const MIN_YEAR = 1900;
 const MAX_YEAR = 2024;

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
    const [yearRange, setYearRange] = useState([MIN_YEAR, MAX_YEAR]);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const location = useLocation();
    const { filteredMovies } = useMovies(searchQuery, yearRange[0], yearRange[1], selectedGenres, selectedLanguage);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
          setKeywords(query);
          setSearchQuery(query);
          setSearchQuery('')
        } else {
          setKeywords('');
          setTempSelectedGenres([]);
          setSelectedGenres([]);
          setYearRange([1900, 2024]);
          setSearchQuery('');
        }
      }, [location]);
      
    //Handler for keywords
    const handleKeyWordsChange = (e) => {
        setKeywords(e.target.value);
    };
    //Handler for search button
    const handleSearchButtonClick = () => {

        setSearchQuery(keywords.trim() || ''); 
        setSelectedGenres([...tempSelectedGenres]); 
      };
    //Handler for pressing Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
    };
    //Handler for genres
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
    //Handler for all genres
    const handleAllGenresChange = (e) => {
        if (e.target.checked) {
            setTempSelectedGenres(genres.map((genre) => genre.id));
            setIsAllGenresSelected(true);
        } else {
            setTempSelectedGenres([]);
            setIsAllGenresSelected(false);
        }
    };
    //Handler for changing year
    const handleRangeChange = (values) => {
        setYearRange(values);
       }
    
    //Handler for language change
    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        console.log('Selected language: ' + selectedLanguage)
        setSelectedLanguage(selectedLanguage)
    }


    return (
        <div className='search-page'>
            <aside className='search-filter'>
                <h2>Search movies</h2>
                <div className='filter'>
                    <label htmlFor='title'>Title name</label>
                    <input
                        type='text'
                        id='keywords'
                        placeholder='Movie name'
                        value={keywords}
                        onChange={handleKeyWordsChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {/*
                <div className='filter'>
                    <label htmlFor='language'>Language</label>
                    <select
                        id='language'
                        value={selectedLanguage}
                        onChange={selectedLanguage}
                    >
                        <option value=''>All languages</option>
                        <option value='en'>english</option>
                        <option value='es'>spanish</option>
                        <option value='fr'>french</option>
                        <option value='de'>german</option>
                        <option value='zh'>chinese</option>
                        <option value='fi'>finnish</option>
                    </select>
                </div>*/}
                <div >
                    <label>Genres</label>
                    <div className='genres-container'>
                    <label className='genre-item'>
                        <input
                            type='checkbox'
                            value="all"
                            checked={isAllGenresSelected}
                            onChange={handleAllGenresChange}
                        />
                        All
                    </label>
                    {genres.map((item) => (
                        <label key={item.id} className='genre-item'>
                            <input
                                type='checkbox'
                                value={item.id}
                                checked={tempSelectedGenres.includes(item.id)}
                                onChange={handleGenreChange}
                            />
                            {item.name}
                        </label>
                    ))}
                </div>
                </div>
                <div className='filter'>
                    <label>Release year</label>
                    <div className='slider-container'>
                        <div className='range-labels'>
                            <span>{yearRange[0]}</span> - <span>{yearRange[1]}</span>
                        </div>
                        {yearRange && yearRange.length === 2 && (
                            <Range
                                step={1}
                                min={MIN_YEAR}
                                max={MAX_YEAR}
                                values={yearRange}
                                onChange={handleRangeChange}
                                renderTrack={({ props, children}) => (
                                    <div {...props} className='range-track'>
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div {...props} className='range-thumb'/>
                                )}
                            />
                        )}
                    </div>
                </div>
                <button className='button' onClick={handleSearchButtonClick}>
                    Search
                </button>
            </aside>
            <div className='search-results'>
                <h3>Search Results</h3>
                {filteredMovies.length > 0 ? (
                    <div className='movies-grid'>
                        {filteredMovies.map((movie) => (
                            <div key={movie.id} className='movie-card'>
                                {movie.poster_path ? (
                                    <Link to={`/movie/${movie.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Link>
                                ) : (
                                    <p>No Image Available</p>
                                )}
                                <h4>{movie.title}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found for your</p>
                )}
            </div>
        </div>
    )
       
}
