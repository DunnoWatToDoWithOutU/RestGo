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
    try {
      await updateBooking(updatedAppt._id);
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
      className="flex bg-cover bg-center overflow-hidden text-white relative text-lg font-bold p-2 px-4 w-full h-40 border-2 justify-between rounded-2xl border-[#15439C]"
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
        
        <p className="text-2xl text-[#15439C] font-bold">{props.hotel.name}</p>
        <button 
        className="absolute top-0 right-0 m-2 " 
        onClick={handleQRButtonClick}
      >
        <Image src={"/img/vectorx.png"} alt="x" className="mt-3 mr-3" width={17} height={17}
        />

      </button>
      </div>
      <p className="text-xl text-[#15439C] font-bold mb-4 mt-5">Check-In QR Code</p>
      {/* QR Code Image */}
      <Image src={"/img/user.png"} alt="QR Code" className="z-50 mb-4" width={150} height={150} />
      <p className="text-sm text-[#2364E2] mb-4">Created At : {createdAt}</p>
      <Button className="bg-[#2364E2] mb-4 rounded-lg mt-3">
        <p className="text-xs text-white px-5 py-0.5 font-bold ">Re-Generate QR</p>
      </Button>
      <p className="text-center text-sm  text-[#26CBFC] mt-3">Please show this QR code to Reception</p>
    </div>
  </div>
)}







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
            onClick={() => setShowEditPopup(true)}
            className="h-5 w-5 bg-cover bg-center hover:scale-110"
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
            className="h-5 w-5 bg-cover bg-center hover:scale-110"
            style={{ backgroundImage: `url(/img/homepage/trash.png)` }}
          ></button>
        </div>
        <div className=" text-end flex flex-col space-y-2 ">
          <p className="text-sm">Created At : {createdAt}</p>
          <Button
            onClick={handleQRButtonClick}
            className="text-xl py-1 bg-primary text-white font-normal rounded-lg hover:bg-primary_dark"
          >
            <p className=" text-center">Check in QR</p>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
