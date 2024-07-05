import express from 'express';
import { getGenre } from '../controllers/Genre.js'
import { getAnimes, getAnimesOngoing, getAnimesById, getAnimesByName, getAnimesByGenre } from '../controllers/Movies.js';

const router = express.Router();

router.post('/movies', getAnimes);
router.get('/movies/genre', getGenre);
router.get('/movies/id/:id', getAnimesById);
router.get('/movies/:genre', getAnimesByGenre);
router.post('/movies/ongoing', getAnimesOngoing);
router.get('/movies/title/:title', getAnimesByName);


export default router;