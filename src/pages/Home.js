import { useEffect, useState } from 'react'
import React from 'react';
import Row from '../components/Row'


import axios from 'axios'
import { parsePath } from 'react-router-dom';


export default function Home() {

    const [searchParam, setParam] = useState('')
    const [movies, setMovies] = useState([])


    return (
        <div id="container">
          <h3>Home</h3>

          <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h4>{movie.title}</h4>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </li>
                ))}
            </ul>
        </div>
      );
    }