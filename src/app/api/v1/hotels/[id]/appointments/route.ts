import Appointment from '@/models/Appointment';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/libs/authOptions';
import { getServerSession } from 'next-auth';
import exp from 'constants';
import { connect } from 'http2';
import connectDB from '@/libs/connectDB';




export const POST = async (
    req: NextRequest, 
    {params}: {params: {id: string}}
) => {
    try {
        await connectDB();
        const { startDate, endDate } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // if duration is longer than 3 nights throw err
        const duration = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        const nights = Math.ceil(duration / (1000 * 60 * 60 * 24));
        console.log(nights)
        if (nights > 3) {
            return NextResponse.json({ error: "Appointment duration cannot be longer than 3 nights" }, { status: 400 });
        }
        const appointment = await Appointment.create({
            startDate: startDate,
            endDate: endDate,
            hotel: params.id,
            user: session.user._id,
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
