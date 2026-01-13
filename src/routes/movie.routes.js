import app from '../app.js';
import { Router } from 'express';
import { createMovie, deleteMovie, getMovieById } from '../controllers/movie.controller.js';

const router = Router();

router.route('/create').post(createMovie);
router.route('/:movieId').get(getMovieById)
                         .delete(deleteMovie);



export default router;