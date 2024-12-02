
import { insertToFavorites, deleteFromFavorites } from '../models/FavoritesModel.js'

const postAddToFavorites = async (req, res, next) => {
    try {
        const { userId, movieId } = req.body
        const affectecRows = await insertToFavorites(userId, movieId)

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

export { postAddToFavorites, postRemoveFromFavorite }