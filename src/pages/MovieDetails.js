import React, { useContext, useEffect, useState,  } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieReviews } from '../api/api.js';
import { UserContext } from '../context/userContext.js';
import axios from 'axios';
import { useUser } from "../context/useUser.js";
import ReviewModal from '../components/ReviewModal.js';

import './MovieDetails.css'

function MovieDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieBackDrop, setMovieBackDrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const [openReviewModal, setOpenReviewModal] = useState(false);

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

  
  //Function to handle adding review
  const handleAddReview = async () => {
    if (!user?.token) {
      setErrorMessage('You need to be logged in to add your review.')
      return
    }

    try {
      // Send review data to the backend
      await axios.post(process.env.REACT_APP_API_URL + '/reviews/add', {
        userId: user.id,
        movieId: movie.id,
        grade: rating,
        review: reviewText,
      })

      //Refresh review data to the backend
      const updatedReviews = await fetchMovieReviews(id)
      setReviews(updatedReviews)

      //Reset modal inputs ad close modal
      setReviewText('');
      setRating(0);
      setIsModalOpen(false);
      setErrorMessage(null);
      alert('Review added succesfully!');
    } catch (error) {
      console.error('Failed to add review: ', error);
      alert('Failed to add review.');
    }
  }

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
    <div className='movie-details-container'>
      <button className='back-button' onClick={() => navigate(-1)}>
        &lt;
      </button>
      <div className='movie-header'>
        <h1 className='movie-title'>{movie.title}</h1>
        <div className="movie-rating">☆☆☆☆☆</div>
      </div>

      <div className="movie-main-content">
        <div className="poster-and-player">
          <div className="poster-container">
            {movie.poster_path ? (
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <p className='no-image-placeholder'>No image available.</p>
            )}
          </div>
          <div className="video-player">
            <p>Video player placeholder</p>
          </div>
        </div>

        <div className="movie-details-and-actions">
          <div className="movie-details">
            <p className='movie-genres'>
              <strong>Movie genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className='movie-overview'>
              <strong>Overview:</strong>
              <br />
              {movie.overview}
            </p>
          </div>

        <div className="movie-actions">
          <div className="group-select-container">
            <label>Select Group:</label>
            <select className="group-select">
              <option>Select</option>
            </select>
            <button className="add-to-group-button">Add to Group</button>
          </div>
          <button className="favorite-button" onClick={handleAddtoFavoritesClick}>
            Add to favourites
          </button>
        </div>
        </div>
      </div>
    
      <div>
      <h4>Reviews</h4>
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
      <Link 
        to="#" 
        onClick={(e) => { 
          e.preventDefault();
          console.log('Link clicked')
          if (user?.token) {
            setOpenReviewModal(true);
            setErrorMessage(null);
          }else {
            setErrorMessage('You need to be logged in to add your review.');
          } 
          }}
          > 
          Add Review
      </Link>
      {openReviewModal && ( <ReviewModal closeReviewModal={setOpenReviewModal}/>)}
      {errorMessage && <p style={{color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default MovieDetails;