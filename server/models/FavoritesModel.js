import { pool } from "../helpers/db.js"

const insertToFavorites = async (userId, movieId) => {

    return await pool.query(
        "INSERT INTO favorite_movies (user_id, movie_id) VALUES ($1 , $2)",
        [userId, movieId]
    )
}

const deleteFromFavorites = async (userId, movieId) => {
    
    return await pool.query(
        "DELETE FROM favorite_movies WHERE user_id = $1 AND movie_id = $2"
        [userId, movieId]
    )

}

export { insertToFavorites , deleteFromFavorites}
