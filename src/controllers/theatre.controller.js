import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Theatre } from "../models/theatre.model";
import { Movie } from "../models/movie.model";

const createTheatre = asyncHandler(async (req, res) => {
    const {name, description, city, pincode, address} = req.body;

    if(!name || !city || !pincode || !address){
        throw new ApiError(400, "Name, City, Pincode and Address are required fields");
    }

    const theatre = await Theatre.findOne({name})
    if(theatre){
        throw new ApiError(409, "Theatre with this name already exists");
    }

    const newTheatre = await Theatre.create({
        name,
        description,
        city,
        pincode,
        address
    })

    res.status(201)
    .json(new ApiResponse(
        201, 
        "Theatre created successfully", 
        newTheatre
    ));
})

const getTheatreById = asyncHandler(async (req, res) => {
    const {theatreId} = req.params;

    const theatre = await Theatre.findById(theatreId);

    if(!theatre){
        throw new ApiError(404, "Theatre not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Theatre fetched successfully",
        theatre
    ));
})

const getAllTheatres = asyncHandler(async (req, res) => {
  const { city, pincode, name } = req.query;

  const filter = {};

  // If city is provided, add to filter
  if (city && city.trim() !== "") {
    filter.city = city.trim();
  }

  // Filter by city (case-insensitive)
  if (city && city.trim() !== "") {
    filter.city = { $regex: city.trim(), $options: "i" };
  }

  // If pincode is provided, add to filter
  if (pincode && pincode.trim() !== "") {
    filter.pincode = pincode.trim();
  }

  // Find theatres based on filter
  const theatres = await Theatre.find(filter);

  if (theatres.length === 0) {
    throw new ApiError(404, "No theatres found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Theatres fetched successfully", theatres)
  );
});


const deleteTheatre = asyncHandler(async (req, res) => {
    const {theatreId} = req.params;
    const theatre = await Theatre.findByIdAndDelete(theatreId);

    if(!theatre){
        throw new ApiError(404, "Theatre not found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Theatre deleted successfully",
        theatre
    ));
})

const addMovieToTheatre = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;
  const { movieId } = req.body;

  // 1. Validate IDs presence
  if (!theatreId || !movieId) {
    throw new ApiError(400, "Theatre ID and Movie ID are required");
  }

  // 2. Find theatre
  const theatre = await Theatre.findById(theatreId);
  if (!theatre) {
    throw new ApiError(404, "Theatre not found");
  }

  // 3. Find movie
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  // 4. Check if movie already exists in theatre
  const isMovieAlreadyAdded = theatre.movies.some(
    (id) => id.toString() === movieId
  );

  if (isMovieAlreadyAdded) {
    throw new ApiError(409, "Movie is already added to this theatre");
  }

  // 4. Add movie using $addToSet (prevents duplicates)  but still returns success even if duplicate not added
//   const updatedTheatre = await Theatre.findByIdAndUpdate(
//     theatreId,
//     { $addToSet: { movies: movieId } },
//     { new: true }
//   );

  // 5. Add movie to theatre
  theatre.movies.push(movieId);
  await theatre.save();

  return res.status(200).json(
    new ApiResponse(200, "Movie added to theatre successfully", theatre)
  );
});


export {
    createTheatre,
    getTheatreById,
    getAllTheatres,
    deleteTheatre,
    addMovieToTheatre
}
