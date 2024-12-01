import { Router } from "express";
import { postAddToFavorites } from '../controllers/FavoritesController.js'

const router = Router();


//Routes for favorite movies
router.post("/addToFavorites", postAddToFavorites)

export default router