import { pool } from "../helpers/db.js"

const insertToFavorites = async (userId, movieId) => {

    const result =  await pool.query(
        
        "INSERT INTO favorite_movies (user_id, movie_id) VALUES ($1 , $2) RETURNING *",
        [userId, movieId]
    )

    return result.rowCount
}

const deleteFromFavorites = async (userId, movieId) => {
   

    const result =  await pool.query(

        "DELETE FROM favorite_movies WHERE user_id = $1 AND movie_id = $2 RETURNING *" ,
        [userId, movieId]
    )

    return result.rowCount
}

export { insertToFavorites , deleteFromFavorites}
