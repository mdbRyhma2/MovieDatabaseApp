import { insertReview, getReviewsByMovie } from '../models/ReviewModel.js'

//Add new review
const postAddReview = async (req, res, next) => {
    try {
        const { userId, movieId, grade, review } = req.body

        //Make sure grade and review are provided
        if (!grade || !review){
            return res.status(400).json({ error: "Grade and review are required."})
        }
        //Call model function to insert the review
        await insertReview(userId, movieId, grade, review)
        res.status(201).json({ message: "Review added successfully!"})

    } catch (error){
        console.error(error.message)
        res.status(500).json({ error: "Failed to add review."})
    }
}

//Get reviews for a specific movie
const getMovieReviews = async (req, res, next) => {
    try {
        const { movieId } = req.params

        //Call model function to retrieve reviews
        const reviews = await getReviewsByMovie(movieId)
        res.status(200).json(reviews.rows)
    } catch (error){
        console.error(error.message)
        res.status(500).json({ error: "Failed to retrieve reviews."})
    }
}

export { postAddReview, getMovieReviews }