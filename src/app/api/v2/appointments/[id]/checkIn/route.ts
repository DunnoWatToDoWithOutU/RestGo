import connectDB from "@/libs/connectDB";
import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import protect from "@/libs/protect";

/**
 * @swagger
 * /api/v2/appointments/[id]/checkIn:
 *   put:
 *     description: CheckIn the booking
 *     tags: [Appointments]
 *     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                id:
*                  type: string
 *     response:
 *       '200':
 *         description: CheckIn Success
 *       '500':
 *         description: Internal server error 
 */

export const PUT = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const user = await protect(req);
    if (!user || !(user.role === "admin" || user.role === "staff")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await connectDB();
        const appointment = await Appointment.findById(params.id);
        if(appointment.status !== "pending"){
            return NextResponse.json({ error: "Appointment is not pending" }, { status: 400 });
        }
        appointment.status = "checkedIn";
        await appointment.save();
        return NextResponse.json(appointment, { status: 200 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
