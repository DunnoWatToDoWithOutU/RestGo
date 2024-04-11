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