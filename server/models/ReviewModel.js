import { pool } from "../helpers/db.js"

const insertReview = async (userId, movieId, grade, review) => {
    console.log("user: ",userId, "movie: ", movieId, "grade: ", grade, "review: ", review)
    return await pool.query(
        "INSERT INTO movie_reviews (user_id, movie_id, grade, review, created_at) VALUES ($1, $2, $3, $4, NOW())",
        [userId, movieId, grade, review]
    )
}

const getReviewsByMovie = async (movieId) => {
    return await pool.query(
        "SELECT mr.review, mr.grade, mr.created_at, u.email FROM movie_reviews mr JOIN users u ON mr.user_id = u.id WHERE mr.movie_id = $1",
        [movieId]
    )
}

export { insertReview, getReviewsByMovie }