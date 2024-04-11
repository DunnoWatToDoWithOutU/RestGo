import mongoose from 'mongoose';

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
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please enter a valid telephone number'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
    },
    tag: {
        type: [String],
        required: [true, 'Please enter the tag'],
    },
    review: {
        type: [{
            rating: Number, 
            reviewText: String
        }],
    },
}, { 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

hotelSchema.virtual(`Appointment`, {
    ref: `Appointment`,
    localField: '_id',
    foreignField: `Hotel`,
    justOne: false
});


const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

export default Hotel;