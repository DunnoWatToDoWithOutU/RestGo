import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/connectDB";
import protect from "@/libs/protect";

/**
 * @swagger
 * /api/v2/appointments:
 *   get:
 *     description: Shows all Appointment
 *     tags: [Appointments]
 *     response:
 *       '200':
 *         description: Fetch Appointments Success
 *       '500':
 *         description: Internal server error 
 */

export async function GET(req: NextRequest) {
  const user = await protect(req);
  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    if (user.role !== "admin") {
      const appointments = await Appointment.find({
        user: user._id,
        status: { $in: ["pending", "checkedIn"] },
      });
      return NextResponse.json(appointments, { status: 200 });
    } else if (user.role === "staff") {
      const appointments = await Appointment.find({
        hotel: user.hotel,

        sstatus: { $in: ["pending", "checkedIn"] },
      });
      return NextResponse.json(appointments, { status: 200 });
    } else {
      const appointments = await Appointment.find({
        status: { $in: ["pending", "checkedIn"] },
      });
      return NextResponse.json(appointments, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
