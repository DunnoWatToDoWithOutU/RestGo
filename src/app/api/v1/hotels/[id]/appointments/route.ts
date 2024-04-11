import Appointment from '@/models/Appointment';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export const POST = async (
    req: any, 
    {params}: {params: {id: string}}
) => {
    try {
        const { startDate, endDate } = await req.json();
        const session = await getSession({ req: req });
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // if duration is longer than 3 nights throw err
        const duration = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        const nights = Math.ceil(duration / (1000 * 60 * 60 * 24));
        if (nights > 3) {
            return NextResponse.json({ error: "Appointment duration cannot be longer than 3 nights" }, { status: 400 });
        }

        const appointment = await Appointment.create({
            startDate: startDate,
            endDate: endDate,
            hotel: params.id,
            user: session.user.id,
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
