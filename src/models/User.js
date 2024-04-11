import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { match } from 'assert';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
    },
    telephone: {
        type: String,
        required: [true, 'Please enter your telephone number'],
        trim: true,
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please enter a valid telephone number'],  
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
