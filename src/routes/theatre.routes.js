import { Router } from "express";
import { createTheatre, getTheatreById, getAllTheatres, deleteTheatre, addMovieToTheatre } from "../controllers/theatre.controller.js";

const router = Router();

router.route('/create').post(createTheatre)
router.route('/get').get(getAllTheatres)
router.route('/:theatreId')
    .get(getTheatreById)
    .delete(deleteTheatre)
router.route("/:theatreId/addMovie").post(addMovieToTheatre)
export default router;