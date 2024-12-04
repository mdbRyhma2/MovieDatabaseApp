import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext'
import axios from 'axios'
import { fetchMovieReviews } from '../api/api.js';
import './ReviewModal.css';

export default function ReviewModal({ closeReviewModal }) {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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


  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
        <button onClick={() => closeReviewModal(false)}> X </button>
        </div>
        <div className='title'>
            <h4>Review</h4>
        </div>
        <div className='body'>
            <p>Here is going to be grade and text review</p>
        </div>
        <div className='review-footer'>
            <button id='cancelBtn'>Cancel</button>
            <button id='submitBtn'>Submit</button>
        </div>
        
      </div>
    </div>
  )
}
