import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotels',
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;