import app from '../app.js';
import { Router } from 'express';
import { createMovie } from '../controllers/movie.controller.js';

const router = Router();

router.route('/create').post(createMovie);

export default router;