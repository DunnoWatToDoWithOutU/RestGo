"use client";
import Link from "next/link";
import { AppointmnetProps, HotelProps } from "../../../@types/type";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";

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

export function BookingCard(props: {
  hotel: HotelProps;
  appointment: AppointmnetProps;
}) {
  // @ts-ignore
  const startDate = formatDate(props.appointment.startDate); // @ts-ignore;
  const endDate = formatDate(props.appointment.endDate); // @ts-ignore;
  const createdAt = formatDate(props.appointment.createdAt);
  return (
    <motion.div
      whileHover={{ left: 10 }}
      className="flex bg-cover bg-center overflow-hidden text-white relative text-lg font-bold p-2 px-4 w-full h-40 border-2 justify-between rounded-2xl border-[#15439C]"
    >
      <div className="absolute inset-0 bg-black rounded-2xl opacity-40 z-10"></div>
      <Image
        alt="hotel"
        src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
        objectFit="cover"
        layout="fill"
        className="absolute w-full left-0 z-0"
      />
      <div className="flex flex-col justify-between relative z-20">
        <div>
          <p>From : {startDate}</p>
          <p>To : {endDate}</p>
        </div>
        <div className="space-y-2">
          <p className="text-2xl">{props.hotel.name}</p>
          <div className="flex space-x-2 items-center">
            <div
              className="h-5 w-5 bg-cover bg-center"
              style={{ backgroundImage: `url(/img/homepage/ping.png)` }}
            ></div>
            <p className="text-sm">{props.hotel.address}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between z-10">
        <div className="flex space-x-1 justify-end">
          <button
            onClick={() => {
              toast.info(`Phone : ${props.hotel.telephone}`);
            }}
            className="h-5 w-5 bg-cover bg-center hover:scale-110"
            style={{ backgroundImage: `url(/img/homepage/phone.png)` }}
          ></button>
          <button
            className="h-5 w-5 bg-cover bg-center hover:scale-110"
            style={{ backgroundImage: `url(/img/homepage/edit.png)` }}
          ></button>
          <button
            className="h-5 w-5 bg-cover bg-center hover:scale-110"
            style={{ backgroundImage: `url(/img/homepage/trash.png)` }}
          ></button>
        </div>
        <div className=" text-end flex flex-col space-y-2 ">
          <p className="text-sm">Created At : {createdAt}</p>
          <Link
            href={`/hotel/${props.hotel.id}`}
            className="text-xl  py-1  bg-primary text-white font-normal rounded-lg hover:bg-primary_dark"
          >
            <p className=" text-center">View Detail</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
