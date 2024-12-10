import { Router } from "express";
import { postAddReview, getMovieReviews } from '../controllers/ReviewController.js'

const router = Router();

//Route to add a review
router.post("/add", postAddReview)

//Route to get reviews for a specific movie
router.get("/:movieId", getMovieReviews)

//Route to get all reviews


export default router