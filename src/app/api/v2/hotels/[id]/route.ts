import connectDB from "@/libs/connectDB";
import Hotel from "@/models/Hotel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const hotel = await Hotel.findById(params.id).populate({
      path: "review",
      populate: {
        path: "user",
        model: "User",
        select: "name",
      },
    });
    return NextResponse.json(hotel, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const requestBody = await req.json();
    const updateData: { [key: string]: any } = {};

    Object.keys(requestBody).forEach((key) => {
      if (requestBody[key] !== null && requestBody[key] !== undefined) {
        updateData[key] = requestBody[key];
      }
    });

    const hotel = await Hotel.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(hotel, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const hotel = await Hotel.findByIdAndDelete(params.id);
    return NextResponse.json(hotel, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
