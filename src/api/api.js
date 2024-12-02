import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const url = 'https://api.themoviedb.org/3'

export const fetchMovies = async (query, language) => {
    const params = {
        query: query,
        language: language || 'en-US',
    };
    const endpoint = '/search/movie';
    try {
        const response = await axios.get(url + endpoint, {
            headers: {
                accept: 'application/json',
                Authorization: apiKey,
            },
            params: params,
        });
        return response.data.results;
    } catch (error) {
        console.log(error.message);
        return []
    }
};

export const fetchMoviesWithoutKeywords = async (minReleaseYear, maxReleaseYear, selectedGenres, language) => {
    // Base endpoint
    let endpoint = `/discover/movie?primary_release_date.gte=${minReleaseYear}-01-01&primary_release_date.lte=${maxReleaseYear}-12-31`;


    if (selectedGenres.length > 0) {
        const genreString = selectedGenres.join('%7C'); // lisätään OR merkki
        endpoint += `&with_genres=` + genreString
    }

    //Include language parameter, default to english if not provided
    endpoint += `&language=${language || 'en-US'}`;

    try {
        const response = await axios.get(url + endpoint, {
            headers: {
                accept: 'application/json',
                Authorization: apiKey,
            },
        });
        return response.data.results;
    } catch (error) {
        console.log(error.message);
        return [];
    }
};



export const fetchGenres = async () => {
    const endpoint = '/genre/movie/list';
    
    try {
        const response = await axios.get(url + endpoint, {
            headers: {
                accept: 'application/json',
                Authorization: apiKey,
            },
        });
        return response.data.results;  
    } catch (error) {
        console.error(error.message);
        return [];
    }
};


