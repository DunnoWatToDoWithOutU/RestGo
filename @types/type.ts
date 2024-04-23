import { User } from "next-auth";


export interface HotelProps{
    id:string;
    name:string;
    address:string,
    telephone:string,
    price:number,
    tag:string[],
    review:ReviewProps[],
    pic:string[],
    rating:number,
}

export interface AppointmnetProps{
    _id:string;
    user:string;
    hotel:string;
    startDate:Date;
    endDate:Date;
    status:string;
    people:number;
    createdAt:Date;
}

export interface PromotionProps{
    _id:string;
    name:string;
    description:string;
    startDate:Date;
    endDate:Date;
    discount:number;
    hotel:HotelProps;
    pic:string;
    coupon:string;
}

export interface ReviewProps{
    rating:Number;
    reviewText:String;
    user:User;
    _id:string;
}