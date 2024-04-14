export interface HotelProps{
    id:string;
    name:string;
    address:string,
    telephone:string,
    price:number,
    tags:string[],
    reviews:string[],
    pic:string[],
}

export interface AppointmnetProps{
    _id:string;
    user:string;
    hotel:string;
    startDate:Date;
    endDate:Date;
    status:string;
    createdAt:Date;
}

export interface PromotionProps{
    _id:string;
    name:string;
    description:string;
    startDate:Date;
    endDate:Date;
    discount:number;
    hotel:string;
    pic:string;
    hotelInfo:HotelProps;
}