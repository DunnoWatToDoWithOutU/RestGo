"use client";
import getHotels from "@/libs/getHotels";
import { HotelList } from "./HotelList";
import { MenuBox } from "./MenuBox/MenuBox";
import { SearchBar } from "./SearchBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { set } from "mongoose";
import { HotelProps } from "../../../@types/type";

export function HomePage() {
  const [hotelData, setHotelData] = useState<HotelProps[]>([]);
  const getHotelData = async () => {
    const hotels = await getHotels();
    setHotelData(hotels);
  };
  useEffect(() => {
    getHotelData();
  }, []);

  console.log(hotelData);
  return (
    <div>
      <div className="px-[10%] mt-20  relative z-10 text-center ">
        <p className=" text-3xl font-semibold text-white shadow-lg">
          Welcome to REST GO. We will get you to rest in piece.
        </p>
        <SearchBar></SearchBar>
        <MenuBox></MenuBox>
        <HotelList HotelData={hotelData}></HotelList>
      </div>
      <div className=" overflow-hidden h-96 w-full bg-black z-0 absolute left-0 top-0">
        <div className="absolute inset-0 bg-black opacity-15 z-10"></div>
        <Image
          src={"/img/homepage.png"}
          alt="hotelhomepage"
          objectFit="cover"
          layout="fill"
          className=" opacity-[0.87]"
        ></Image>
      </div>
    </div>
  );
}
