import { pool } from "../helpers/db.js"

const insertToFavorites = async (userId, movieId, movieTitle, poster_path, genres, releaseDate, overview) => {

    const result =  await pool.query(
        
        "INSERT INTO favorite_movies (user_id, movie_id, movie_title, poster_path, genres, release_date, overview) VALUES ($1 , $2, $3, $4, $5, $6, $7) RETURNING *",
        [userId, movieId, movieTitle, poster_path, genres, releaseDate, overview]
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

const getAllFavorites = async (userId) => {

    return await pool.query("SELECT * from favorite_movies WHERE user_id = $1" ,
        [userId]
    )
}

//Sharing functionality
const insertSharedList = async (shareId, userId, favorites) => {
    
    const result = await pool.query(

        "INSERT INTO shared_lists (share_id, user_id, movie_id) VALUES ($1, $2, $3) RETURNING *",
        [shareId, userId, JSON.stringify(favorites)]
    )
    return result.rowCount
}
const getSharedListById = async (shareId) => {

    const result = await pool.query(
        "SELECT favorites FROM shared_lists WHERE share_id = $1",
        [shareId]
    )
    return result.rows[0]?.favorites
}

export { insertToFavorites , deleteFromFavorites, getAllFavorites, insertSharedList, getSharedListById }
