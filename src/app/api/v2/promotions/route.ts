import connectDB from "@/libs/connectDB"
import Promotion from "@/models/Promotion"
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v2/promotions:
 *   get:
 *     description: Fetch all promotions
 *     response:
 *       200:
 *         description: Fetching Promotions Successfully
 *       500:
 *         description: Internal server error
 *   post:
 *     description: Create the promotion
 *     response:
 *       201:
 *         description: The promotion is successfully created
 *       500:
 *         description: Internal server error
 *   delete:
 *     description: Delete the promotion
 *     response:
 *       200:
 *         description: The promotion is successfully deleted
 *       500:
 *         description: Internal server error
 */

export const GET = async ()=>{
    try{
        await connectDB();
        const currentDate = new Date();
        const promotions = await Promotion.find({endDate: { $gte: currentDate }}).populate({
            path: "hotel",
            model: 'Hotel',
        });
        return NextResponse.json(promotions, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export const POST = async (req :NextRequest)=>{
    try{
        await connectDB();
        const {name, discount, startDate,hotel,coupon, endDate, pic,description} = await req.json();
        const promotion = await Promotion.create({
            name: name,
            description: description,
            discount: discount,
            startDate: startDate,
            endDate: endDate,
            hotel:hotel,
            coupon:coupon,
            pic:pic 
        });
        return NextResponse.json(promotion, {status: 201});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
export const DELETE = async () => {
    try {
        await connectDB();
        const currentDate = new Date(); 
        await Promotion.deleteMany({
            endDate: { $lt: currentDate } 
        });
        return NextResponse.json({ message: "Deleted promotions successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
