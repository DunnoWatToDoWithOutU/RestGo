import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
    req: NextRequest
) {
    try {
        const { name, email, password, telephone, role } = await req.json();
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            telephone: telephone,
            role: role,
        });
        return NextResponse.json(user, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}