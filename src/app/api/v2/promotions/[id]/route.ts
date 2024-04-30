import connectDB from "@/libs/connectDB";
import Promotion from "@/models/Promotion";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v2/promotions/[id]:
 *   get:
 *     description: Fetch promotions by Hotel Id
 *     response:
 *       200:
 *         description: Fetching Promotions Successfully
 *       500:
 *         description: Internal server error
 */

export async function GET(req:NextRequest,{params}: {params: {id: string}}){
    try{
        connectDB();
        const promotion = await Promotion.find({hotel: params.id});
        return NextResponse.json(promotion, {status: 200});
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}