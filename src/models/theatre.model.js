import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            minLength: 5
        },
        description:{
            type: String,
        },
        movies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            
        }],
        city:{
            type: String,
            required: true
        },
        pincode:{
            type: Number,
            required: true
        },
        address:{
            type: String,
            required: true
        }

    },
    { timestamps: true }
)

export const Theatre = mongoose.model('Theatre', theatreSchema);