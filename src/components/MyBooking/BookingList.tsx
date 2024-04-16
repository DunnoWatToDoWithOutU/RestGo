import getAppointments from "@/libs/getAppointments";
import getHotel from "@/libs/getHotel";
import { AppointmnetProps } from "../../../@types/type";
import { BookingCard } from "./BookingCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";


export async function BookingList() {
  const session = await getServerSession(authOptions);

  const bookingDatas: AppointmnetProps[] = await getAppointments(
    session ? session?.user.token : ""
  );

  if (bookingDatas.length === 0) {
    return <div></div>;
  }
  return (
    <div className="space-y-4 mt-4">
      {bookingDatas.map(async (bookingData, index) => {
        const hotel = await getHotel(bookingData.hotel);
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
