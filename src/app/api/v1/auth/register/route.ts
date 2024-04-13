import connectDB from '@/libs/connectDB';
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
    req: NextRequest
) {
    try {
        await connectDB();
        const { name, email, password, telephone, role } = await req.json();
        const lowerEmail = email.toLowerCase();
        const user = await User.create({
            name: name,
            email: lowerEmail,
            password: password,
            telephone: telephone,
            role: role,
        });
        return NextResponse.json(user, { status: 201 });
    } catch (err: any) {
        for (const key in err.errors) {
            return NextResponse.json({ error: err.errors[key].message }, { status: 400 });
        }
    }
}