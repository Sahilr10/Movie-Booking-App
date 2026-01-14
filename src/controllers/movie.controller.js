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

const getMovieById = asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Movie fetched successfully",
            movie
        )
    );
});

const deleteMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findByIdAndDelete(movieId);

    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Movie deleted successfully",
            movie
        )
    );
})

const updateMovie = asyncHandler(async (req,res) => {
    const { movieId } = req.params;
    const { name, description, casts, trailerUrl, language, releaseDate, director, gener, releaseStatus } = req.body;

    const updateData = {
    name,
    description,
    casts,
    trailerUrl,
    language,
    releaseDate,
    director,
    gener,
    releaseStatus
    };

    const movie = await Movie.findByIdAndUpdate(
        movieId,
        { $set: updateData },
        {   
            new: true,
            runValidators: true
        }
    )

    if(!movie){
        throw new ApiError(404, "Movie not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            "Movie updated successfully",
            movie
        )
    );
})

const getMoviesByName = asyncHandler(async (req, res) => {
     const { name } = req.query;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Movie name is required for search");
  }

  const movies = await Movie.find({
    name: { $regex: name, $options: "i" }   
  });

  if (movies.length === 0) {
    throw new ApiError(404, "No movies found with the given name");
  }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Movies fetched successfully",
            movies
        )
    );
})

export { 
    createMovie,
    getMovieById,
    deleteMovie,
    updateMovie,
    getMoviesByName
 }