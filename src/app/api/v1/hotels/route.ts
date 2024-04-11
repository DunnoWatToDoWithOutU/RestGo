import Hotel from '@/models/Hotel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const hotels = await Hotel.find();
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, address, telephone, price, tag } = await req.json();
        const hotel = await Hotel.create({
            name: name,
            address: address,
            telephone: telephone,
            price: price,
            tag: tag ? tag : [],
            review: [],
        });
        return NextResponse.json(hotel, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}