import connectDB from '@/libs/connectDB';
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/v2/auth/register:
 *   post:
 *     description: Register the session
 *     tags: [Auth]
 *     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                name:
*                  type: string
*                email:
*                  type: string
*                  format: email
*                password:
*                  type: string
*                telephone:
*                  type: string
 *     response:
 *       '201':
 *         description: Register Success
 *       '400':
 *         description: Hotel is required for staff
 */

export async function POST(
    req: NextRequest
) {
    try {
        await connectDB();
        const { name, email, password, telephone, hotel, role } = await req.json();
        const lowerEmail = email.toLowerCase();
        if(role == "staff" && !hotel){
            return NextResponse.json({ error: "Hotel is required for staff" }, { status: 400 });
        }
        const user = await User.create({
            name: name,
            email: lowerEmail,
            password: password,
            telephone: telephone,
            hotel: hotel,
            role: role,
        });
        return NextResponse.json(user, { status: 201 });
    } catch (err: any) {
        for (const key in err.errors) {
            return NextResponse.json({ error: err.errors[key].message }, { status: 400 });
        }
    }
}