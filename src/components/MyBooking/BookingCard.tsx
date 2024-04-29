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
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

  const handleSaveEdit = async (updatedAppt: AppointmnetProps) => {
    try {
      await updateBooking(updatedAppt._id, session ? session?.user.token : "", startDate, endDate);
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

  const [showQRCode, setShowQRCode] = useState(false);

  const handleQRButtonClick = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <motion.div
      whileHover={{ left: 10 }}
      className={`flex bg-cover bg-center overflow-hidden text-white relative font-bold p-2 px-4 w-full h-40 border-2 justify-between rounded-2xl 
      border-${
        props.appointment.status === "pending"
          ? "white"
          : props.appointment.status === "checkedIn"
          ? "[#4FD274]"
          : "[#15439C]"
      }`} //changed by status
    >
      {showEditPopup && (
        <EditPopup
          Appt={props.appointment}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          Hotel={undefined}
        />
      )}
      {showQRCode && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-16 rounded-lg flex flex-col items-center relative w-[600px] h-[530px]">
            <div className="flex justify-between w-full">
              <p className="text-2xl text-[#15439C] font-bold">
                {props.hotel.name}
              </p>
              <button
                className="absolute top-0 right-0 m-2 "
                onClick={handleQRButtonClick}
              >
                <Image
                  src={"/img/vectorx.png"}
                  alt="x"
                  className="mt-3 mr-3"
                  width={17}
                  height={17}
                />
              </button>
            </div>
            <p className="text-xl text-[#15439C] font-bold mb-4 mt-5">
              Check-In QR Code
            </p>
            {/* QR Code Image */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://rest-go.vercel.app/mybooking/${props.appointment._id}`}
              alt="QR Code"
              className="z-50 mb-4"
              width={150}
              height={150}
            />
            <p className="text-sm text-[#2364E2] mb-4">
              Created At : {createdAt}
            </p>
            <Button className="bg-[#2364E2] mb-4 rounded-lg mt-3 hover:bg-primary_dark">
              <p className="text-xs text-white px-5 py-0.5 font-bold ">
                Re-Generate QR
              </p>
            </Button>
            <p className="text-center text-sm  text-[#26CBFC] mt-3">
              Please show this QR code to Reception
            </p>
          </div>
        </div>
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
            <span className="hidden sm:inline">Status : </span>
            <span
              className={`text-${
                props.appointment.status === "pending"
                  ? "white"
                  : props.appointment.status === "checkedIn"
                  ? "[#4FD274]"
                  : "primary"
              }`}
            >
              {props.appointment.status}
            </span>
          </span>
          <p>
            <span className="hidden sm:inline">From :</span> {startDate}
          </p>
          <p>
            <span className="hidden sm:inline">To :</span> {endDate}
          </p>
        </div>
        <div>
          <p className="text-md sm:text-lg md:text-xl">{props.hotel.name}</p>
          <div className="flex space-x-2 items-center">
            <div
              className="h-5 w-5 bg-cover bg-center"
              style={{ backgroundImage: `url(/img/homepage/ping.png)` }}
            ></div>
            <p className="text-[7pt] sm:text-[9pt] line-clamp-2">
              {props.hotel.address}
            </p>
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
                await deleteBooking(props.appointment._id, session ? session.user.token : "");
                window.location.reload();
                console.log("refresh");
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
        <div className=" text-end flex flex-col space-y-2 ">
          <p className="text-sm">Created At : {createdAt}</p>
          <div className="flex space-x-2  ">
            <Button
              onClick={handleQRButtonClick}
              className="text-xl py-1 bg-primary text-white font-normal rounded-lg hover:bg-primary_dark"
            >
              <p className=" text-center">Check in QR</p>
            </Button>
            <Link
              href={`/mybooking/${props.appointment._id}`}
              className="text-xl py-1 px-3 bg-primary transition-colors duration-200 text-white font-normal rounded-lg hover:bg-primary_dark"
            >
              <p className=" text-center">Booking Info</p>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
