import express from 'express';
import { getGenre } from '../controllers/Genre.js'
import { getMovie, getMovieOngoing, getMovieById, getMovieByName, getMovieByGenre } from '../controllers/Movies.js';

const router = express.Router();

router.post('/movies', getMovie);
router.get('/movies/genre', getGenre)
router.get('/movies/id/:id', getMovieById);
router.get('/movies/:genre', getMovieByGenre);
router.post('/movies/ongoing', getMovieOngoing);
router.get('/movies/title/:title', getMovieByName);


export default router;