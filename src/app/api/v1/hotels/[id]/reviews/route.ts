import Hotel from "@/models/Hotel";
import connectDB from "@/libs/connectDB";
import { NextRequest, NextResponse } from "next/server";
import protect from "@/libs/protect";

export const POST = async (
    req: NextRequest,
    {params}: {params: {id: string}},
) => {
    try {
        await connectDB();
        const user = await protect(req);
        if(!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const { rating, reviewText } = await req.json();
        const hotel = await Hotel.findById(params.id);
        if (!hotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }
        console.log(hotel.review);
        const review = {
            rating: rating,
            reviewText: reviewText,
            user: user._id,
        };
        hotel.review.push(review);
        console.log(hotel.review);
        await hotel.save();
        return NextResponse.json(hotel, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}