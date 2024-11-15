import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'

const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTFjZTU5MWVlYmE2NjM2NjE0ZDU5MjkwOWFiMDQ2OSIsIm5iZiI6MTczMTQxNTY0Ny4zNDk5ODI3LCJzdWIiOiI2NzAzYjlhYTNhZmM5MWE1ZjExMzhmOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fmacFouYIawnMS5fnNiWzl-NCY1mXY1jiwCu-7X8WrY';

export default function Search() {
    const [movies, setMovies] = useState([])
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            submitSearch(query)
        }
    }, [location]);

    const submitSearch = async (query) => {
        const url = 'https://api.themoviedb.org/3/search/movie';
        try {
            const response = await axios.get(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                },
                params: { query }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div id="container">
            <h3>Search Results</h3>
            {movies.length > 0 ? (
                <ul>
                    {movies.map((movie) => (
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
    );
}
