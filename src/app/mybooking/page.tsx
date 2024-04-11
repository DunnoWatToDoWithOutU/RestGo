import { BookingList } from "@/components/MyBooking/BookingList";

export default function Home() {
  return (
    <section className="px-[10%] mt-20">
      <div className="w-full text-[#15439C] h-screen border-[3px] rounded-2xl p-7 relative border-[#15439C]">
        <p className=" absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
          Your Booking History
        </p>
        <p className="text-xl font-bold">Incoming Booking :</p>
        <BookingList></BookingList>
      </div>
    </section>
  );
}