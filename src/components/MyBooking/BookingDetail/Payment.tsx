"use client";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AppointmnetProps, HotelProps } from "../../../../@types/type";

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

export function Payment(props: {
  appointment: AppointmnetProps;
  hotel: HotelProps;
}) {
  const [showQRCode, setShowQRCode] = useState(false); // @ts-ignore;
  const createdAt = formatDate(props.appointment.createdAt);

  const handleQRButtonClick = () => {
    setShowQRCode(!showQRCode);
  };
  return (
    <div>
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
      <button
        onClick={handleQRButtonClick}
        className=" bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 drop-shadow-sm"
      >
        Show QR Code
      </button>
    </div>
  );
}
