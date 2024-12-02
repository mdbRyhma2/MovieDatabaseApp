import { insertToFavorites } from '../models/FavoritesModel.js'

const postAddToFavorites = async (req, res, next) => {
    try {
        const { userId, movieId } = req.body
        await insertToFavorites(userId, movieId)
        res.status(200).json({ message: "Movie added to favorites successfully!" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to add movie to favorites." })
    }

}

const postRemoveFromFavorite = async (req, res, next) => {
    try {
        const { userId, movieId } = req.body
        await deleteFromFavorites(userId, movieId)
        res.status(200).json({ message: "Movie successfully removed from favorites!" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to remove movie from favorites." })
    }
}

export { postAddToFavorites, postRemoveFromFavorite }