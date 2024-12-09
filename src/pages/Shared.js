import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/useUser";
import { Link, useParams } from "react-router-dom";
import "./Shared.css"


export default function Profile() {

    const {publicId} = useParams()
    const [profileData, setProfileData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchFavorites = async () => {
            console.log("fetch public favorites", publicId);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/favorites/getPublicFavorites/` + publicId
                );
                console.log("fetchFavorites data", response.data);
                setFavorites(response.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setFavorites([]);
                    console.log("No favorites found");
                }
                console.log("error ", error.response?.status);
            }
        };

        fetchFavorites();
    }, [publicId])

    if (error) return <div>{error}</div>;

    return (
        <div className="shared">
            <h3>Shared Favorite Movies</h3>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <li key={movie.movie_id} className="movie-card">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p>{movie.movie_title}</p>
                    </li>
                ))}
            </div>
        </div>
    );
}
