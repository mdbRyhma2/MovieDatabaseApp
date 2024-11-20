import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const url = 'https://api.themoviedb.org/3'

export const fetchMovies = async (query) => {
    const params = {
        query: query,
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

export const fetchMovieLenght = async (maxRunTime) => {
    const endpoint = '/discover/movie?with_runtime.lte={$maxRuntime}'

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
}


