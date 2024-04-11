import Appointment from "@/models/Appointment";
import {  NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET( req: NextRequest,
    {params}: {params: {id: string}}) {
    console.log("params",params.id);
    try { 
        const appointments = await Appointment.find({ user:params.id});
        return NextResponse.json(appointments, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}
