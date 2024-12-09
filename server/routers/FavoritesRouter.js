import { Router } from "express";
import { postAddToFavorites, postRemoveFromFavorite, postGetFavorites, postGetPublicFavorites } from '../controllers/FavoritesController.js'
import { auth } from "../helpers/auth.js";

const router = Router();

//Route for shared favorites list
router.get("/getPublicFavorites/:id", postGetPublicFavorites)

//Routes for favorite movies
router.get("/getFavorites", auth, postGetFavorites)
router.post("/addToFavorites", auth, postAddToFavorites)
router.delete("/removeFromFavorites", auth, postRemoveFromFavorite)


export default router