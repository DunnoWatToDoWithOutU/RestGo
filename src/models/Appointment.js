import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    startDate: {
        type: Date,
        required: [true, 'Please enter the start date'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please enter the end date'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status:{
        type:String,
        enum:['pending', 'checkedIn', 'checkedOut'],
        default:'pending'
    },
    people:{
        type:Number,
        required:[true, 'Please enter the number of people']
    
    },
    promotion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Promotion',
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;