// import { Detail } from "@/components/MyBooking/BookingDetail/Detail";
// import { Payment } from "@/components/MyBooking/BookingDetail/Payment";
// import { Receipt } from "@/components/MyBooking/BookingDetail/Receipt";
// import getAppointment from "@/libs/getAppointment";
// import getHotel from "@/libs/getHotel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/libs/authOptions";
// import checkIn from "@/libs/checkIn";
// import checkOut from "@/libs/checkOut";
// import CheckInOutButton from "@/components/MyBooking/BookingDetail/CheckInOutButton";

// export default async function BookingDetail({
//   params,
// }: {
//   params: { id: string };
// }) {

//   const bookingData = await getAppointment(params.id);
//   const hotelData = await getHotel(bookingData.hotel);

//   const session = await getServerSession(authOptions);
//   const userRole = session?.user?.role;
//   const token = session?.user.token ?? '';

//   const canUseCheckInCheckOut = userRole==="admin" || userRole==="staff";
//   const status = bookingData.status;

//   const handleCheckedIn = () =>{
//     console.log('use checkin')
//     checkIn(params.id, token);
//   }

//   const handleCheckedOut = () =>{
//     console.log('use checkout')
//     checkOut(params.id, token);
//   }

//   return (
//     <section className="flex flex-row px-[10%] space-x-3 min-h-screen mt-20">
//       <div className="flex flex-col mr-1 w-[60%]">
//         <Detail bookingData={bookingData}></Detail>
//         <Payment></Payment>
//         {canUseCheckInCheckOut &&
//         <CheckInOutButton status={status}
//                           handleCheckedIn={handleCheckedIn}
//                           handleCheckedOut={handleCheckedOut}
//         />}
//       </div>
//       <div className="w-[80%]">
//         <Receipt hotel={hotelData} bookingData={bookingData}></Receipt>
//       </div>
//     </section>
//   );
// }

"use client";

import { Detail } from "@/components/MyBooking/BookingDetail/Detail";
import { Payment } from "@/components/MyBooking/BookingDetail/Payment";
import { Receipt } from "@/components/MyBooking/BookingDetail/Receipt";
import getAppointment from "@/libs/getAppointment";
import getHotel from "@/libs/getHotel";
import { useSession } from "next-auth/react";
import checkIn from "@/libs/checkIn";
import checkOut from "@/libs/checkOut";
import CheckInOutButton from "@/components/MyBooking/BookingDetail/CheckInOutButton";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BookingDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [bookingData, setBookingData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [token, setToken] = useState("");
  const [canUseCheckInCheckOut, setCanUseCheckInCheckOut] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const bookingData = await getAppointment(params.id);
      const hotelData = await getHotel(bookingData.hotel);
      const userRole = session?.user?.role;
      const token = session?.user?.token ?? "";
      const canUseCheckInCheckOut =
        userRole === "admin" || userRole === "staff";
      const status = bookingData.status;

      setBookingData(bookingData);
      setHotelData(hotelData);
      setToken(token);
      setCanUseCheckInCheckOut(canUseCheckInCheckOut);
      setStatus(status);
    };

    fetchData();
  }, [params.id, session]);

  const handleCheckedIn = async () => {
    console.log("use checkin");
    await checkIn(params.id, token);
    toast.success("update status success!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.reload();
  };

  const handleCheckedOut = async () => {
    console.log("use checkout");
    await checkOut(params.id, token);
    toast.success("update status success!");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.reload();
  };

  if (!bookingData || !hotelData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-[100%] flex flex-col md:px-[10%] px-[3%] min-h-screen mt-20">
      <div className="flex flex-row place-content-between">
        <Payment hotel={hotelData} appointment={bookingData}></Payment>
        {canUseCheckInCheckOut && (
          <CheckInOutButton
            status={status}
            handleCheckedIn={handleCheckedIn}
            handleCheckedOut={handleCheckedOut}
          />
        )}
      </div>
      <div className="mt-5">
        <Detail bookingData={bookingData}></Detail>
        <Receipt hotel={hotelData} bookingData={bookingData}></Receipt>
      </div>
    </section>
  );
}
