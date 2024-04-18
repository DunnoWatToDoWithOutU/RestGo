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
    <div className="w-full text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C]">
      <p className="absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
        Booking Detail
      </p>
      <div className="flex flex-row">
        <span className="font-bold">Dates : </span>
        {"  "}
        {formatDate(startDate.toString())} - {formatDate(endDate.toString())}
      </div>
      <div>
        <span className="font-bold">Duration : </span> {duration}
      </div>
    </div>
  );
}
