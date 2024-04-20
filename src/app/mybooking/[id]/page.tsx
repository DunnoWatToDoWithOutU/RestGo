import { Detail } from "@/components/MyBooking/BookingDetail/Detail";
import { Payment } from "@/components/MyBooking/BookingDetail/Payment";
import { Receipt } from "@/components/MyBooking/BookingDetail/Receipt";
import getAppointment from "@/libs/getAppointment";
import getHotel from "@/libs/getHotel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export default async function BookingDetail({
  params,
}: {
  params: { id: string };
}) {
  const bookingData = await getAppointment(params.id);
  const hotelData = await getHotel(bookingData.hotel);
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const canUseCheckInCheckOut = userRole==="admin" || userRole==="staff";

  return (
    <section className="flex flex-row px-[10%] space-x-3 min-h-screen mt-20">
      <div className="flex flex-col mr-1 w-[60%]">
        <Detail bookingData={bookingData}></Detail>
        <Payment></Payment>
        {canUseCheckInCheckOut && 
          <div className="w-full  text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C] my-5">
            <div className="absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
              Check-In & Check-Out
            </div>
            <button className=" bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 mt-5"
              //onClick={};
            >
              Check-In & Check-Out
            </button>
          </div>
        }
      </div>
      <div className="w-[80%]">
        <Receipt hotel={hotelData} bookingData={bookingData}></Receipt>
      </div>
    </section>
  );
}
