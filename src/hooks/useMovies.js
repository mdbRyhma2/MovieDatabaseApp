import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/api';

export const useMovies = (keywords, minReleaseYear, maxReleaseYear, selectedGenres) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const submitSearch = async () => {
            if (keywords) {
                const results = await fetchMovies(keywords);
                setMovies(results);
                filterMoviesByYearAndGenre(results); 
            }
        };

        submitSearch();
    }, [keywords]); 

    useEffect(() => {

        if (movies.length > 0) {
            filterMoviesByYearAndGenre(movies);
        }
    }, [selectedGenres, minReleaseYear, maxReleaseYear, movies]); 

    const filterMoviesByYearAndGenre = (moviesList) => {
        let filteredMoviesList = moviesList;

        filteredMoviesList = filteredMoviesList.filter((movie) => {
            const releaseYear = new Date(movie.release_date).getFullYear();
            return releaseYear >= minReleaseYear && releaseYear <= maxReleaseYear;
        });

        if (selectedGenres.length > 0) {
   
            filteredMoviesList = filteredMoviesList.filter((movie) => {
                return movie.genre_ids.some(genreId => selectedGenres.includes(genreId));
            });
        }

        setFilteredMovies(filteredMoviesList); 
    };

    return { filteredMovies };
};
