import User from '@/models/User';
import jwt from 'jsonwebtoken';
import connectDB from './connectDB';
export default async function protect(req) {
    await connectDB();
    if (!req.headers.get('authorization') && !req.headers.get('authorization')?.startsWith('Bearer')) {
        return null;
    }
    const token = req.headers.get('authorization')?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return null;
        }
        const user = User.findById(decoded.id);
        return user;
    } catch (error) {
        return null;
    }
};
