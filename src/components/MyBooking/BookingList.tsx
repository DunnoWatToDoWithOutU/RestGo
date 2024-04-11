import getAppointments from "@/libs/getAppointment";
import { getHotel } from "@/libs/getHotel";
import getHotels from "@/libs/getHotels";
import { AppointmnetProps } from "../../../@types/type";
import { BookingCard } from "./BookingCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function BookingList() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <div>Please Login</div>;
  }
  const bookingDatas: AppointmnetProps[] = await getAppointments(
    session.user._id
  );
  console.log("hello");
  console.log(bookingDatas);
  if (bookingDatas.length === 0) {
    return <div></div>;
  }
  console.log("hi");
  console.log(bookingDatas);
  return (
    <div className="space-y-4 mt-4">
      {bookingDatas.map(async (bookingData, index) => {
        const hotel = await getHotel({ id: bookingData.hotel });
        return (
          <BookingCard
            key={index}
            hotel={hotel}
            appointment={bookingData}
          ></BookingCard>
        );
      })}
    </div>
  );
}
