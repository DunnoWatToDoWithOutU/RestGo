import connectDB from '@/libs/connectDB';
import Hotel from '@/models/Hotel';
import { model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const hotels = await Hotel.find().populate({
            path: "review",
            populate: {
                path: "user",
                model: 'User',
                select: "name",
            },
        });
        console.log(hotels[0].review[0].user);
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