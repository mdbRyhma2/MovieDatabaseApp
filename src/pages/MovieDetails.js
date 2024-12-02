import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieReviews } from '../api/api.js';
import { UserContext } from '../context/userContext.js'
import axios from 'axios';

function MovieDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieBackDrop, setMovieBackDrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const backdropUrl = 'https://image.tmdb.org/t/p/w500'

  useEffect(() => {

    const getMovieDetailsAndReviews = async () => {
      try {
        const details = await fetchMovieDetails(id); 
        if (details.backdrop_path){
          setMovieBackDrop(details.backdrop_path)
        }
        setMovie(details);

        //Fetch reviews from backend
        const reviewsData = await fetchMovieReviews(id)
        setReviews(reviewsData)
      } catch (err) {
        setError('Failed to fetch movie details or reviews.'); 
      } finally {
        setLoading(false);
      }
    };

    getMovieDetailsAndReviews();
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
      await axios.post(process.env.REACT_APP_API_URL + '/favorites/addToFavorites', {
        userId: user.id,   
        movieId: movie.id  
      });
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie to favorites. /MD');
    }
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button> 
      <h1>{movie.title}</h1>

      <button onClick={() => handleAddtoFavoritesClick()}>Add to favorites</button> 

      

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
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <div className='reviews'>
          {reviews.map((review, index) => (
            <div key={index} className='review-item'>
              <p className='review-header'>
                <strong>{review.email}</strong> - <em>{new Date(review.created_at).toLocaleDateString()}</em>
              </p>
              <p>Grade: {review.grade}</p>
              <p>{review.review}</p>
              <hr/>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet for this movie</p>
      )}
    </div>
  );
}

export default MovieDetails;
