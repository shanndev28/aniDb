import express from 'express'
import { tambahGenre } from '../controllers/Genre.js'
import { tambahAnime } from '../controllers/Movies.js'
import { tambahEpsAnime } from '../controllers/Eps.js'

const router = express.Router()

router.post("/admin/shann/dev/add-genre", tambahGenre)
router.post("/admin/shann/dev/add-movies", tambahAnime)
router.post("/admin/shann/dev/add-episode", tambahEpsAnime)

export default router