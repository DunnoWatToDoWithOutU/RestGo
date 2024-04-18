import Appointment from "@/models/Appointment";
import {  NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/connectDB";
import protect from "@/libs/protect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const user = await protect(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try { 
        await connectDB();
        const appointment = await Appointment.findById(params.id);
        return NextResponse.json(appointment, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const user = await protect(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await connectDB();
        if( user.role !== "admin" ){
            const appointment = await Appointment.findById(params.id);
            console.log(appointment.user.type);
            if (appointment.user.toString() === user._id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }
        const { startDate, endDate } = await req.json();
        const duration = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        const nights = Math.ceil(duration / (1000 * 60 * 60 * 24));
        if (nights > 3) {
            return NextResponse.json({ error: "Appointment duration cannot be longer than 3 nights" }, { status: 400 });
        }
        const appointment = await Appointment.findByIdAndUpdate(params.id, {
            startDate: startDate,
            endDate: endDate,
        }, {
            new: true,
            runValidators: true,
        });
        return NextResponse.json(appointment, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await connectDB();
        if( session.user.role !== "admin" ){
            const appointment = await Appointment.findById(params.id);
            if (appointment.user.toString() !== session.user._id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }
        await Appointment.findByIdAndDelete(params.id);
        return NextResponse.json({ message: "Appointment deleted" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
