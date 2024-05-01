import connectDB from '@/libs/connectDB';
import Hotel from '@/models/Hotel';
import { model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { HotelProps } from '../../../../../@types/type';

function Max(num1: number, num2: number) {
    return num1 > num2 ? num1 : num2;
  }

  /**
* @swagger
* components:
*   schemas: 
*       Hotel:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The auto-generated id of the hotel
*                   example: 6618586439a309fbc3e0da23
*               name:
*                   type: string
*                   description: The hotel's name
*               address:
*                   type : string
*                   description : The address of the hotel
*               telephone:
*                   type: string
*                   description : The telephone number of the hotel
*               price:
*                   type: number
*                   description: the price of the hotel per room per night
*               tag:
*                   type: array
*                   items:
*                       type: string
*                   description: The tags of the hotel
*               review:
*                   type: array
*                       items:
*                           $ref: '#/components/schemas/Review'
*               pic:
*                   type: array
*                   items:
*                       type: string
*/

/**
 * @swagger
 * /api/v2/hotels:
 *   get:
 *     description: Fetch all Hotels
 *     tags: [Hotel]
 *     response:
 *       '200':
 *         description: Fetching Hotels Successfully
 *         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                $ref: '#/components/schemas/Hotel'
 *       '500':
 *         description: Internal server error 
 *   post:
 *     description: Create the Hotel
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               telephone:
 *                 type: string
 *               price:
 *                 type: number
 *               tag:
 *                 type: array
 *                 items:
 *                   type: string
 *               pic:
 *                 type: array
 *                 items:
 *                   type: string
 *     response:
 *       '201':
 *         description: The hotel is successfully created
 *       '500':
 *         description: Internal server error 
 */

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const hotels:HotelProps[] = await Hotel.find()
        console.log(hotels[0].review[0].user);
        hotels.map((hotel,index)=>{
            
            const sumReview = Max(
                Math.round(
                  (hotel.review.reduce((sum, review) => {
                    return sum + Number(review.rating);
                  }, 0) /
                    hotel.review.length) *
                    10
                ) / 10,
                0
              );
            hotels[index].rating = sumReview;
            
        })
        console.log(hotels);
        return NextResponse.json(hotels, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, address, telephone, price, tag, pic } = await req.json();
        const hotel = await Hotel.create({
            name: name,
            address: address,
            telephone: telephone,
            price: price,
            tag: tag ? tag : [],
            review: [],
            pic:pic,
        });
        return NextResponse.json(hotel, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}