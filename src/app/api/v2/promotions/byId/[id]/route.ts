import connectDB from "@/libs/connectDB";
import Promotion from "@/models/Promotion";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v2/promotions:
 *   get:
 *     description: Fetch promotion by promotion Id
 *     tags: [Promotion]
 *     response:
 *       200:
 *         description: Fetching Promotion Successfully
 *       500:
 *         description: Internal server error
 */

export async function GET(req:NextRequest,{params}: {params: {id: string}}){
    try{
        connectDB();
        const promotion = await Promotion.find({_id: params.id});
        return NextResponse.json(promotion, {status: 200});
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}