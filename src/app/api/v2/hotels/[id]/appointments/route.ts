import Appointment from "@/models/Appointment";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/connectDB";
import protect from "@/libs/protect";
export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const user = await protect(req);
    const { startDate, endDate, people, promotion } = await req.json();
    const duration = Math.abs(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    const nights = Math.ceil(duration / (1000 * 60 * 60 * 24));
    if (nights > 3) {
      return NextResponse.json(
        { error: "Appointment duration cannot be longer than 3 nights" },
        { status: 400 }
      );
    }
    const appointment = await Appointment.create({
      startDate: startDate,
      endDate: endDate,
      hotel: params.id,
      people: people,
      user: user._id,
      promotion: promotion ? promotion : null,
    });
    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
