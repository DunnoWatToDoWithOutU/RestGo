import exp from "constants";
import mongoose from "mongoose";
import Hotel from "./Hotel";

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the promotion name'],
        trim: true,
    },
    hotel:{
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: [true, 'Please enter the hotel'],
    },
    description: {
        type: String,
        required: [true, 'Please enter the promotion description'],
        trim: true,
    },
    discount: {
        type: Number,
        required: [true, 'Please enter the promotion discount'],
    },
    pic:{
        type:String,
        required: [true, 'Please enter the promotion picture'],
    },
    startDate:{
        type: Date,
        required: [true, 'Please enter the promotion start date'],
    },
    endDate:{
        type: Date,
        required: [true, 'Please enter the promotion end date'],
    },
    coupon:{
        type: String,
        required: [true, 'Please enter the promotion coupon'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Promotion = mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
export default Promotion;