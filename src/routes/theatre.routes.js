import { Router } from "express";
import { createTheatre, getTheatreById, getAllTheatres } from "../controllers/theatre.controller.js";

const router = Router();

router.route('/create').post(createTheatre)
router.route('/all').get(getAllTheatres)
router.route('/:theatreId').get(getTheatreById)

export default router;