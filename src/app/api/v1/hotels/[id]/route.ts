import Hotel from '@/models/Hotel'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    try {
        const hotel = await Hotel.findById(params.id)
        return NextResponse.json(hotel, {status: 200})
    } catch (err) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}