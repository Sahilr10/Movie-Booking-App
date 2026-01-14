import { Router } from 'express';
import { createMovie, deleteMovie, getMovieById, updateMovie, getMoviesByName } from '../controllers/movie.controller.js';

const router = Router();

router.route('/create').post(createMovie);
router.route('/search').get(getMoviesByName);
router.route('/:movieId')
    .get(getMovieById)
    .delete(deleteMovie)
    .patch(updateMovie)


export default router;