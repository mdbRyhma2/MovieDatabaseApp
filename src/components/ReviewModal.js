import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { fetchMovieReviews, fetchMovieDetails } from '../api/api.js';
import './ReviewModal.css';

export default function ReviewModal({ closeReviewModal, movieId }) {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const details = await fetchMovieDetails(id)
                setMovie(details)
            } catch (err) {
                setError('Failed to fetch movie details')
            }
        };
        getMovieDetails()
    }, [id]);

    //Function to handle adding review
    const handleAddReview = async (moviId) => {
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
            alert('Review added succesfully!');
        } catch (error) {
            console.error('Failed to add review: ', error);
            alert('Failed to add review.');
        }
    }

  return (
    <div className='modal-overlay'>
      <div className='modal-form'>
        <h3>Add Review</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          Rating (1-5):
          <input
            type='number'
            min='1'
            max='5'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </label>
        <br />
        <div className='button-container'>
          <button className='submit-button' onClick={() => handleAddReview(movieId)}>
            Submit Review
          </button>
          <button
            className='cancel-button'
            onClick={() => closeReviewModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
