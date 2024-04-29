"use client";
import { AppointmnetProps } from "../../../../@types/type";
function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function Detail(props: { bookingData: AppointmnetProps }) {
  const startDate = new Date(props.bookingData.startDate);
  const endDate = new Date(props.bookingData.endDate);
  const duration =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  return (
    <div className="w-full text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C] my-5">
      <p className="absolute left-5 -top-5 px-4 bg-white text-lg sm:text-xl md:text-2xl text-[#15439C] font-bold">
        Booking Detail
      </p>
      <div className="flex flex-row">
        <span className="font-bold">Dates : </span>
        <span className="ml-1">
          {formatDate(startDate.toString())} - {formatDate(endDate.toString())}
        </span>
      </div>
      <div className="flex flex-row">
        <span className="font-bold">People : </span>
        <span className="ml-1">{props.bookingData.people} peoples</span>
      </div>
      <div className="flex flex-row">
        <span className="font-bold">Rooms : </span>
        <span className="ml-1">{props.bookingData.room} rooms</span>
      </div>
      <div>
        <span className="font-bold">Duration : </span>
        <span className="ml-1">
          {Math.ceil(duration)} {" day(s)"}
        </span>
      </div>
    </div>
  );
}
