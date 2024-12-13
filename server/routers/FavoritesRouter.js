import { Router } from "express";
import { postAddToFavorites, postRemoveFromFavorite, postGetFavorites } from '../controllers/FavoritesController.js'
import { postCreateShareableList, getSharedList } from '../controllers/FavoritesController.js'

const router = Router();


//Routes for favorite movies
router.get("/getFavorites", postGetFavorites)
router.post("/addToFavorites", postAddToFavorites)
router.delete("/removeFromFavorites",  postRemoveFromFavorite)

//Routes for sharing favorite list
router.post("/createShareableList", postCreateShareableList)
router.get("/sharedList/:shareId", getSharedList)

export default router