import connectDB from "@/libs/connectDB";
import Promotion from "@/models/Promotion";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}: {params: {id: string}}){
    try{
        connectDB();
        const promotion = await Promotion.findById(params.id);
        return NextResponse.json(promotion, {status: 200});
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}