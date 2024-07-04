import express from 'express';
import { getEpisode, getEpisodeById, getEpisodeByMovieId } from '../controllers/Eps.js';

const router = express.Router();

router.get('/episode', getEpisode);
router.get('/episode/:id', getEpisodeById);
router.post('/episode/movie/:id', getEpisodeByMovieId);

export default router;