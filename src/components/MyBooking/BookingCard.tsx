"use client";
import Link from "next/link";
import { AppointmnetProps, HotelProps } from "../../../@types/type";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import deleteBooking from "@/libs/deleteBooking";
import EditPopup from "../Editpopup";
import { useState } from "react";
import updateBooking from "@/libs/updateBooking";

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

  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEdit = () => {
    setShowEditPopup(true);
  };

  const handleSaveEdit = async (updatedAppt: AppointmnetProps) => {
    // Call your updateBooking function here with the updated appointment details
    try {
      await updateBooking(updatedAppt._id);
      // Assuming you have a function to fetch updated booking data, update it here
      // fetchBookingData();
      toast.success("Appointment details updated successfully");
    } catch (error) {
      console.error("Error updating Appointment details:", error);
      toast.error("Failed to update Appointment details");
    } finally {
      setShowEditPopup(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
  };

  return (
    <motion.div
      whileHover={{ left: 10 }}
      className={`flex bg-cover bg-center overflow-hidden text-white relative font-bold p-2 px-4 w-full h-40 border-2 justify-between rounded-2xl 
      border-${props.appointment.status === "pending" ? "white" : props.appointment.status === "checkedIn" ? "[#4FD274]" : "[#15439C]"}`}//changed by status
    >
      {showEditPopup && (
        <EditPopup
          Appt={props.appointment}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          Hotel={undefined}
        />
      )}
      <div className="absolute inset-0 bg-black rounded-2xl opacity-40 z-10"></div>
      <Image //Add BG image
        alt="hotel"
        src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
        objectFit="cover"
        layout="fill"
        className="absolute w-full left-0 z-0"
      />
      <div className="flex flex-col justify-between relative z-20">
        <div className="text-[9pt] sm:text-[11pt] md:text-[12pt]">
          <span className="bg-white/50 px-2 py-1 rounded-md">
            <span className="hidden sm:inline">Status : {" "}</span> 
            <span className={`text-${props.appointment.status === "pending" ? "white" : props.appointment.status === "checkedIn" ? "[#4FD274]" : "primary"}`}>
              {props.appointment.status}
            </span>
          </span>
          <p><span className="hidden sm:inline">From :</span> {startDate}</p>
          <p><span className="hidden sm:inline">To :</span> {endDate}</p>
        </div>
        <div>
          <p className="text-md sm:text-lg md:text-xl">{props.hotel.name}</p>
          <div className="flex space-x-2 items-center">
            <div
              className="h-5 w-5 bg-cover bg-center"
              style={{ backgroundImage: `url(/img/homepage/ping.png)` }}
            ></div>
            <p className="text-[7pt] sm:text-[9pt] line-clamp-2">{props.hotel.address}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between z-10">
        <div className="flex space-x-1 justify-end">
          <button
            onClick={() => {
              toast.info(`Phone : ${props.hotel.telephone}`);
            }}
            className="h-4 w-4 bg-cover bg-center hover:scale-110 sm:h-5 sm:w-5"
            style={{ backgroundImage: `url(/img/homepage/phone.png)` }}
          ></button>
          <button
            onClick={() => setShowEditPopup(true)}
            className="h-4 w-4 bg-cover bg-center hover:scale-110 sm:h-5 sm:w-5"
            style={{ backgroundImage: `url(/img/homepage/edit.png)` }}
          ></button>

          <button
            onClick={async () => {
              try {
                await deleteBooking(props.hotel.id);
                window.location.reload();
                console.log('refresh')
              } catch (err) {
                console.log(err);
                toast.error("Error Delete Booking");
                return;
              }
              toast.success("Delete Finsih");
            }}
            className="h-4 w-4 bg-cover bg-center hover:scale-110 sm:h-5 sm:w-5"
            style={{ backgroundImage: `url(/img/homepage/trash.png)` }}
          ></button>
        </div>
        <div className="text-end flex flex-col space-y-2 ">
          <p className="text-[6pt] sm:text-[8pt] md:text-[10pt]">Created : {createdAt}</p>
          <Link
            href={`/mybooking/${props.appointment._id}`}
            className="text-xl py-1 bg-primary text-white font-normal rounded-lg hover:bg-primary_dark"
          >
            <p className="text-[8pt] sm:text-[10pt] md:text-[12pt] font-bold text-center">View Detail</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
