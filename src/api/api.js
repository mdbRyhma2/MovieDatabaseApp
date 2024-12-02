import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

export const fetchMoviesWithoutKeywords = async (minReleaseYear, maxReleaseYear, selectedGenres) => {
    // Base endpoint
    let endpoint = `/discover/movie?primary_release_date.gte=${minReleaseYear}-01-01&primary_release_date.lte=${maxReleaseYear}-12-31`;


    if (selectedGenres.length > 0) {
        const genreString = selectedGenres.join('%7C'); // lisätään OR merkki
        endpoint += `&with_genres=` + genreString
    }

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


export const fetchMovieDetails = async (id) => {
    const endpoint = `/movie/` + id;
    try {
        const response = await axios.get(url + endpoint, {
            headers: {
                accept: 'application/json',
                Authorization: apiKey,
            },
        });
        return response.data; 
    } catch (error) {
        console.error(error.message);
        return null
    }
}