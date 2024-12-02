import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";
import "./Profile.css";

export default function Profile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
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

  if (error) return <div>{error}</div>;

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
      <div className="fav-movies-container">
        <div className="fav-movie-item">
          <img
            src="https://images.freeimages.com/images/large-previews/39a/spring-1377434.jpg?fmt=webp&h=350"
            alt="picture"
          />
          <h3>Movie title</h3>
        </div>
        <div className="fav-movie-item">
          <img
            src="https://images.freeimages.com/images/large-previews/39a/spring-1377434.jpg?fmt=webp&h=350"
            alt="picture"
          />
          <h3>Movie title</h3>
        </div>
        <div className="fav-movie-item">
          <img
            src="https://images.freeimages.com/images/large-previews/39a/spring-1377434.jpg?fmt=webp&h=350"
            alt="picture"
          />
          <h3>Movie title</h3>
        </div>
        <div className="fav-movie-item">
          <img
            src="https://images.freeimages.com/images/large-previews/39a/spring-1377434.jpg?fmt=webp&h=350"
            alt="picture"
          />
          <h3>Movie title</h3>
        </div>
      </div>
    </div>
  );
}
