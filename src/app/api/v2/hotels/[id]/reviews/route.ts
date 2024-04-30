import Hotel from "@/models/Hotel";
import connectDB from "@/libs/connectDB";
import { NextRequest, NextResponse } from "next/server";
import protect from "@/libs/protect";

/**
 * @swagger
 * /api/v2/hotels/[id]/reviews:
 *   post:
 *     description: Create Review to the hotel
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               reviewText:
 *                 type: string
 *               userID:
 *                 type: string
 *     response:
 *       '201':
 *         description: Review is successfully created
 *       '404':
 *         description: Hotel is not found
 *       '500':
 *         description: Internal server error 
 */

export const POST = async (
    req: NextRequest,
    {params}: {params: {id: string}},
) => {
    try {
        await connectDB();
        const { rating, reviewText ,userID} = await req.json();
        const hotel = await Hotel.findById(params.id);
        if (!hotel) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }
        console.log(hotel.review);
        const review = {
            rating: rating,
            reviewText: reviewText,
            user: userID,
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