import connectDB from "@/libs/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

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
        return NextResponse.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            telephone: user.telephone,
            role: user.role,
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}