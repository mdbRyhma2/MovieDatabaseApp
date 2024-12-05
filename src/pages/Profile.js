import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";
import "./Profile.css";
import { Link } from "react-router-dom";

const url = "http://localhost:3001";

export default function Profile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and has a valid token
    if (user.token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setProfileData(response.data); // Set the user data
          fetchFavorites()
        } catch (err) {
          setError("Failed to fetch profile data.");
          console.error(err);
        }
      };

      fetchProfile();
    } else {
      setError("You need to log in to view your profile.");
    }
  }, [user.token]);

  const handleDeleteAccount = (id) => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .delete(url + "/delete/" + id, headers)
      .then((response) => {

      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  };

  if (error) return <div>{error}</div>;

  const fetchFavorites = async () => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorites/getFavorites`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          params: {
            userId: user.id
          }
        }
      );
      setFavorites(response.data)
      console.log(favorites)

    } catch (error) {
      console.error(error)
      console.log("error")
    }
  }

  const handleRemoveFromFavoritesClick = async (movie_id) => {
    console.log(favorites)
    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/favorites/removeFromFavorites', {
        data:
        {
          userId: user.id,
          movieId: movie_id
        }
      });
      fetchFavorites()
      alert('Movie removed from favorites!');
    } catch (error) {
      console.error('Failed to remove movie:', error);
      alert('Failed to remove movie from favorites. /MD');
    }
  }

  return (
    <div className="profile">
      <div className="profile-info">
        {profileData && (
          <>
            <img src="/images/pfp.png" alt="Profile picture" />
            <div className="profile-details">
              <h2>{profileData.username}</h2>
              <p>{profileData.first_name}</p>
              <p>{profileData.last_name}</p>
            </div>
          </>
        )}
      </div>
      <h3>Favourite movies</h3>
      <div className='movies-grid'>
        {favorites.map((movie) => (
          <li key={movie.movie_id} className='movie-card'>
            {movie.poster_path ? (
              <Link to={`/movie/${movie.movie_id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ) : (
              <p>No Image Available</p>
            )}
            <Link to={`/movie/${movie.movie_id}`}>{movie.movie_title}</Link>


            <button onClick={() => handleRemoveFromFavoritesClick(movie.movie_id)}>Remove from favorites</button>
          </li>
        ))}
      </div>
      <button className="delete-account-button" onClick={handleDeleteAccount}>
        Delete account
      </button>
    </div>
  );
}
