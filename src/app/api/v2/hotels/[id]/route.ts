import connectDB from "@/libs/connectDB";
import Hotel from "@/models/Hotel";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v2/hotels/[id]:
 *   get:
 *     description: Fetch the Hotel by Id
 *     tags: [Hotel]
 *     response:
 *       200:
 *         description: Fetching Hotel Successfully
 *       500:
 *         description: Internal server error 
 *   put:
 *     description: Update the Hotel by Id
 *     tags: [Hotel]
 *     response:
 *       200:
 *         description: The hotel is successfully updated
 *       500:
 *         description: Internal server error 
 *   delete:
 *     description: Delete the Hotel by Id
 *     tags: [Hotel]
 *     response:
 *       200:
 *         description: The hotel is successfully deleted
 *       500:
 *         description: Internal server error 
 */

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
