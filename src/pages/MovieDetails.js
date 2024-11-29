import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../api/api.js'; // Import the fetch function

function MovieDetails() {
  const { id } = useParams(); // Get the 'id' from the URL
  const [movie, setMovie] = useState(null); // Movie details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch movie details using the ID from URL
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id); // Wait for the API call to resolve
        setMovie(details); // Set the movie details state
      } catch (err) {
        setError('Failed to fetch movie details.'); // Set error state if something goes wrong
      } finally {
        setLoading(false); // End the loading state
      }
    };

    getMovieDetails(); // Call the async function
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

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button> 
      <h1>{movie.title}</h1>
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
