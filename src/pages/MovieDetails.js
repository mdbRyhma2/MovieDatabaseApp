import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../api/api.js';
import { UserContext } from '../context/userContext.js'
import axios from 'axios';

function MovieDetails() {
  const { user } = useContext(UserContext)
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieBackDrop, setMovieBackDrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const backdropUrl = 'https://image.tmdb.org/t/p/w500'

  useEffect(() => {

    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id); 
        if (details.backdrop_path){
          setMovieBackDrop(details.backdrop_path)
        }
        setMovie(details); 

      } catch (err) {
        setError('Failed to fetch movie details.'); 
      } finally {
        setLoading(false);
        console.log("movie",movie);
      }
    };

    getMovieDetails();
    
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const handleAddtoFavoritesClick = async () => {
    
    try {

      const genreIds = movie.genres.map(genre => genre.id)
      await axios.post(process.env.REACT_APP_API_URL + '/favorites/addToFavorites', {
        userId: user.id,   
        movieId: movie.id,
        movieTitle: movie.title,
        poster_path: movie.poster_path,
        genres: genreIds,
        releaseDate: movie.release_date,
        overview: movie.overview
      });
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie to favorites. /MD');
    }
  }

  
  const handleRemoveFromFavoritesClick = async () => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/favorites/removeFromFavorites', {
        data:
        {
          userId: user.id,
          movieId: movie.id
        }
      });
      alert('Movie removed from favorites!');
    } catch (error) {
      console.error('Failed to remove movie:', error);
      alert('Failed to remove movie from favorites. /MD');
    }
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button> 
      <h1>{movie.title}</h1>

      <button onClick={() => handleAddtoFavoritesClick()}>Add to favorites</button> 

      <button onClick={() => handleRemoveFromFavoritesClick()}>Remove from favorites</button> 

      

{/*       {movieBackDrop ? (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: backdropUrl + movieBackDrop }}
        >{console.log(backdropUrl + movieBackDrop )}</div>
      ) : (
        <p>No backdrop available.</p>
      )}// Asettaa backdropkuvan, jos sellaista haluaa käyttää */}


      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}
      <br></br>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
}

export default MovieDetails;
