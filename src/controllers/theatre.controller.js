import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Theatre } from "../models/theatre.model";

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
    const theatres = await Theatre.find();

    if(theatres.length === 0){
        throw new ApiError(404, "No theatres found");
    }

    return res.status(200).json(new ApiResponse(
        200,
        "Theatres fetched successfully",
        theatres
    ));
})

export {
    createTheatre,
    getTheatreById,
    getAllTheatres
}
