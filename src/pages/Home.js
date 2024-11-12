import { useEffect, useState } from 'react'
import React from 'react';
import Row from '../components/Row'


import axios from 'axios'
import { parsePath } from 'react-router-dom';

const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTFjZTU5MWVlYmE2NjM2NjE0ZDU5MjkwOWFiMDQ2OSIsIm5iZiI6MTczMTQxNTY0Ny4zNDk5ODI3LCJzdWIiOiI2NzAzYjlhYTNhZmM5MWE1ZjExMzhmOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fmacFouYIawnMS5fnNiWzl-NCY1mXY1jiwCu-7X8WrY'




export default function Home() {

    const [searchParam, setParam] = useState('')
    const [movies, setMovies] = useState([])


    const submitSearch = async () => {
        if(!searchParam) return
        const url = 'https://api.themoviedb.org/3/search/movie'

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: apiKey
            },
            params: {
                query: searchParam
            }
        }

        try {
            const response = await axios.get(url,{
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                  },
                  params: {
                      query: searchParam
                  }
            })
            const movieResults = response.data.results
            setMovies(movieResults)
        } catch (error) {
            console.log(error.message)
        }
    }


    
    return (
        <div id="container">
          <h3>Home</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input placeholder='Search'
              value={searchParam}
              onChange={e => setParam(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  submitSearch()
                }
              }}
            />
    
          </form>


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