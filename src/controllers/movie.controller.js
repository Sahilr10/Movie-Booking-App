import { asyncHandler } from "../utils/asyncHandler.js";
import { Movie } from "../models/movie.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createMovie = asyncHandler(async (req,res) => {
    const { name, description, casts, trailerUrl, language, releaseDate, director, gener,releaseStatus } = req.body;

    if(
        [name, description, trailerUrl, language, director, releaseStatus].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    if (!Array.isArray(casts) || casts.length === 0) {
        throw new ApiError(400, "Casts are required and must be an array");
    }

    if (!Array.isArray(gener) || gener.length === 0) {
        throw new ApiError(400, "Gener is required and must be an array");
    }

    if (!releaseDate || isNaN(new Date(releaseDate).getTime())) {
        throw new ApiError(400, "Valid release date is required");
    }

    const movie = await Movie.create({
        name,
        description,
        casts,
        trailerUrl,
        language,
        releaseDate,
        director,
        gener,
        releaseStatus
    });

    return res
        .status(201)
        .json(new ApiResponse(
            201, 
            "Movie created successfully", 
            movie
        )
    );

    
})

export { 
    createMovie
 }