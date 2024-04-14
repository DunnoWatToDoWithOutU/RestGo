import connectDB from "@/libs/connectDB"
import Promotion from "@/models/Promotion"
import { NextRequest, NextResponse } from "next/server";


export const GET = async ()=>{
    try{
        await connectDB();
        const promotions = await Promotion.find();
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
        const {name, discount, startDate,hotel, endDate, pic,description} = await req.json();
        const promotion = await Promotion.create({
            name: name,
            description: description,
            discount: discount,
            startDate: startDate,
            endDate: endDate,
            hotel:hotel,
            pic:pic 
        });
        return NextResponse.json(promotion, {status: 201});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}