import connectDB from "@/libs/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v2/auth/login:
 *   post:
 *     description: Login the session
 *     tags: [Auth]
 *     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                email:
*                  type: string
*                  format: email
*                password:
*                  type: string
 *     response:
 *       '200':
 *         description: Login Success
 *       '401':
 *         description: Invalid Password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error 
 */

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        const token = user.getSignedJwtToken();
        return NextResponse.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            telephone: user.telephone,
            role: user.role,
            token: token,
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}