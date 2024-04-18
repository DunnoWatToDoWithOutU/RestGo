import { Detail } from "@/components/MyBooking/BookingDetail/Detail";
import { Payment } from "@/components/MyBooking/BookingDetail/Payment";
import { Receipt } from "@/components/MyBooking/BookingDetail/Receipt";
import getAppointment from "@/libs/getAppointment";
import getHotel from "@/libs/getHotel";

export default async function BookingDetail({
  params,
}: {
  params: { id: string };
}) {
  const bookingData = await getAppointment(params.id);
  const hotelData = await getHotel(bookingData.hotel);
  console.log(hotelData, "hotelData");
  console.log(bookingData, "bookingData");

  return (
    <section className="flex flex-row px-[10%] space-x-3 min-h-screen mt-20">
      <div className="flex flex-col mr-1 w-[60%] ">
        <Detail bookingData={bookingData}></Detail>
        <Payment></Payment>
      </div>
      <div className="w-[80%]">
        <Receipt hotel={hotelData} bookingData={bookingData}></Receipt>
      </div>
    </section>
  );
}
