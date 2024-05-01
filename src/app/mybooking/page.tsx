import { BookingList } from "@/components/MyBooking/BookingList";
import { ExpireBookingList } from "@/components/MyBooking/ExpireBookingList";

export default function Home() {
  return (
    <section className="md:px-[10%] px-[3%] mt-20 min-h-[450px]">
      <div className="w-full text-[#15439C]  border-[3px] rounded-2xl md:p-7 p-2  relative border-[#15439C]">
        <p className="text-[13pt] md:text-[18pt] absolute left-10 -top-5 px-4 bg-white  text-[#15439C] font-bold">
          Your Booking History
        </p>
        <p className="text-[12pt] md:text-[15pt] font-bold ml-2">
          Incoming Booking :
        </p>
        <BookingList></BookingList>
        <div className="h-1 w-full my-8 bg-[#15439C]"></div>
        <p className="text-[12pt] md:text-[15pt] font-bold ml-2">
          History Booking :
        </p>
        <ExpireBookingList></ExpireBookingList>
      </div>
    </section>
  );
}
