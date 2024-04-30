import Appointment from "@/models/Appointment";
import {  NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/connectDB";
import protect from "@/libs/protect";

/**
 * @swagger
 * /api/v2/appointments/[id]:
 *   get:
 *     description: Fetch the Appointment by Id
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     response:
 *      '200':
 *        description: Fetching the Appointment Successfully
 *      '500':
 *        description: Internal server error 
 *   put:
 *     description: Update the Appointment by Id
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               startDate:
 *                 type: Date
 *               endDate:
 *                 type: Date
 *     response:
 *       '200':
 *         description: The Appointment is successfully updated
 *       '400':
 *         description: Appointment duration cannot be longer than 3 nights
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Delete the Appointment by Id
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     response:
 *       '200':
 *         description: The Appointment is successfully deleted
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error 
 */

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
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
            if( appointment.user.toString() !== user._id.toString() ){
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
    const user = await protect(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await connectDB();
        if( user.role !== "admin" ){
            const appointment = await Appointment.findById(params.id);
            if( appointment.user.toString() !== user._id.toString() ){
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }
        await Appointment.findByIdAndDelete(params.id);
        return NextResponse.json({ message: "Appointment deleted" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
