import express from 'express'
import { addFavorite, getFavorite, deleteFavorite, getFavoriteById } from '../controllers/Fav.js'

const router = express.Router()

router.get('/favorite', getFavorite)
router.get('/favorite/:id', getFavoriteById)
router.get('/favorite/add/:id', addFavorite)
router.get('/favorite/del/:id', deleteFavorite)

export default router