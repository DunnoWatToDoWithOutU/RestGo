import { BookingList } from "@/components/MyBooking/BookingList";
import { ExpireBookingList } from "@/components/MyBooking/ExpireBookingList";

export default function Home() {
  return (
    <section className="px-[10%] mt-20">
      <div className="w-full text-[#15439C]  border-[3px] rounded-2xl p-7 relative border-[#15439C]">
        <p className="text-[15pt] sm:text-[18pt] absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
          Your Booking History
        </p>
        <p className="text-[12pt] sm:text-[15pt] text-xl font-bold">Incoming Booking :</p>
        <BookingList></BookingList>
        <div className="h-1 w-full my-8 bg-[#15439C]"></div>
        <p className="text-[12pt] sm:text-[15pt] text-xl font-bold">History Booking :</p>
        <ExpireBookingList></ExpireBookingList>
      </div>
    </section>
  );
}
