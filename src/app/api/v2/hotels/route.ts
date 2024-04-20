import connectDB from '@/libs/connectDB';
import Hotel from '@/models/Hotel';
import { model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { HotelProps } from '../../../../../@types/type';

function Max(num1: number, num2: number) {
    return num1 > num2 ? num1 : num2;
  }

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const hotels:HotelProps[] = await Hotel.find()
        console.log(hotels[0].review[0].user);
        hotels.map((hotel,index)=>{
            
            const sumReview = Max(
                Math.round(
                  (hotel.review.reduce((sum, review) => {
                    return sum + Number(review.rating);
                  }, 0) /
                    hotel.review.length) *
                    10
                ) / 10,
                0
              );
            hotels[index].rating = sumReview;
            
        })
        console.log(hotels);
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, address, telephone, price, tag, pic } = await req.json();
        const hotel = await Hotel.create({
            name: name,
            address: address,
            telephone: telephone,
            price: price,
            tag: tag ? tag : [],
            review: [],
            pic:pic,
        });
        return NextResponse.json(hotel, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}