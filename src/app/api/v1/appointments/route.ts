import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function GET(req: any) {
    try {
        const session = await getSession({ req: req });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const appointments = await Appointment.find({ user: session.user.id });

        return NextResponse.json(appointments, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}