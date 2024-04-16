import mongoose from 'mongoose';
import User from './User';

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the hotel'],
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter the address'],
        trim: true,
    },
    telephone: {
        type: String,
        required: [true, 'Please enter the telephone number'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
    },
    tag: {
        type: [String],
        required: [true, 'Please enter the tag'],
    },
    review: [
        {
            rating: Number,
            reviewText: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },
    ],
    pic:{
        type:[String],
        required: [true, 'Please enter the picture'],
    }
}, { 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;