import { Router } from "express";
import { postAddToFavorites, postRemoveFromFavorite } from '../controllers/FavoritesController.js'

const router = Router();


//Routes for favorite movies
router.post("/addToFavorites", postAddToFavorites)
router.delete("/removeFromFavorites", postRemoveFromFavorite)

export default router