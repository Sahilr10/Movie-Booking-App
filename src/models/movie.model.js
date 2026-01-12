import mongoose from "mongoose";


const movieSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        description: {
            type: String,
            required: true
        },
        casts: {
            type: [String],
            required: true
        },
        trailerUrl: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true,
            default: "English"
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        director: {
            type: String,
            required: true
        },
        gener: {
            type: [String],
            required: true
        },
        releaseStatus: {
            type: String,
            required: true,
            // enum: ["RELEASED", "COMING_SOON", "BLOCKED"]
            default: "RELEASED"
        }
        
    },
    { timestamps:true }
);

export const Movie = mongoose.model("Movie", movieSchema);