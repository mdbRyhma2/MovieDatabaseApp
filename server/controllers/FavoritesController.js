import { response } from 'express'
import { insertToFavorites, deleteFromFavorites, getAllFavorites } from '../models/FavoritesModel.js'
import { insertSharedList, getSharedListById } from '../models/FavoritesModel.js'

//Don't know yet what this is
import { v4 as uuidv4 } from "uuid";

const postAddToFavorites = async (req, res, next) => {
    try {
        const { userId, movieId, movieTitle, poster_path, genres, overview, releaseDate } = req.body
        const affectecRows = await insertToFavorites(userId, movieId, movieTitle, poster_path, genres, releaseDate, overview)

        if (affectecRows > 0){
        res.status(200).json({ message: "Movie added to favorites successfully!" })
        } else{
            res.status(400).json({error: "Movie could not be added to favorites."})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to add movie to favorites." })
    }

}

const postRemoveFromFavorite = async (req, res, next) => {

    try {
        const { userId, movieId } = req.body
        const affectedRows = await deleteFromFavorites(userId, movieId)

        if (affectedRows > 0) {
            res.status(200).json({ message: "Movie successfully removed from favorites!" });
        } else {
            res.status(400).json({ error: "Movie not found in favorites or could not be removed." });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to remove movie from favorites." })
    }
}


const postGetFavorites = async (req, res, next) => {

    try {
        const  userId  = req.query.userId
        const result = await getAllFavorites(userId)


        if (result.rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            res.status(404).json({ error: "Could not find favorites" });
        }
    } catch (error) {

        console.log(error.message)
        res.status(500).json({ error: "Failed to remove movie from favorites." })
    }
}

//Sharing functionality
const postCreateShareableList = async (req, res) => {
    try{
        const { userId, favorites } = req.body
        if (!favorites || !Array.isArray(favorites) || favorites.length === 0){
            return res.status(400).json({ error: "Favorites list is required and cannot be empty." })
        }
        const shareId = uuidv4(); //Generate a unique ID for the shared list.
        const affectedRows = await insertSharedList(shareId, userId, favorites)

        if (affectedRows > 0) {
            res.status(201).json({ shareId, message: "Shared list created succesfully!" })
        } else {
            res.status(400).json({ error: "Failed to create shared list." })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to create shared list" })
    }
}

const getSharedList = async (req, res) => {
    try {
        const { shareId } = req.params
        const favorites = await getSharedListById(shareId)

        if (favorites) {
            res.status(200).json(JSON.parse(favorites))
        } else {
            res.satus(404).json({ error: "Shared list not found." })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Faile to retrieve shared list." })
    }
}

export { postAddToFavorites, postRemoveFromFavorite, postGetFavorites, postCreateShareableList, getSharedList }