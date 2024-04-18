'use client'
import { Detail } from "@/components/MyBooking/BookingDetail/Detail";
import { Payment } from "@/components/MyBooking/BookingDetail/Payment";
import { Receipt } from "@/components/MyBooking/BookingDetail/Receipt";
import getAppointment from "@/libs/getAppointment";
import { useEffect, useState } from "react";
import { AppointmnetProps, HotelProps } from "../../../../@types/type";
import getHotel from "@/libs/getHotel";
import { useSession } from "next-auth/react";

export default function BookingDetail({params}: {params: { id: string }}) {
  const [bookingData, setBookingData] = useState<AppointmnetProps>({
    _id:"",
    user:"",
    hotel:"",
    startDate:new Date(''),
    endDate:new Date(''),
    status:"",
    createdAt:new Date('')
  });

  const [HotelData, setHotelData] = useState<HotelProps>({
    id:"",
    name:"",
    address:"",
    telephone:"",
    price:0,
    tag:[],
    review:[],
    pic:[],
    rating:0,
  })

  const { data: session } = useSession();
  const token = session ? session.user.token : ""
  console.log(token);
  const getBookingData = async () => {
    const fetchBooking = await getAppointment(token, params.id);
    setBookingData(fetchBooking);
  };

  const getHotelData = async () => {
    const fetchHotel = await getHotel(bookingData.hotel);
    setHotelData(fetchHotel);
  };

  useEffect(() => {
    getBookingData();
    getHotelData();
  }, []);

  return (
    <section className="flex flex-row px-[10%] mt-20">
        <div className="flex flex-col mr-1 w-[60%]">
            <Detail startDate={bookingData.startDate} endDate={bookingData.endDate}></Detail>
            <Payment></Payment>
        </div>
        <div className="w-[40%]">
            <Receipt hotel={HotelData} startDate={bookingData.startDate} endDate={bookingData.endDate}></Receipt>
        </div>
    </section>
  );
}
