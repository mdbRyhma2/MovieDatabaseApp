import { pool } from "../helpers/db.js"

const insertToFavorites = async (userId, movieId) => {
    console.log("id:t ", userId, movieId)
    return await pool.query(
        "INSERT INTO favorite_movies (user_id, movie_id) VALUES ($1 , $2)",
        [userId, movieId]
    )
}

export { insertToFavorites }