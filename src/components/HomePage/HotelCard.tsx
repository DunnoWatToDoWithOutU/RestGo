"use client";
import { Rating } from "@mui/material";
import { HotelProps } from "../../../@types/type";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import Image from "next/image";

export function HotelCard(props: { hotel: HotelProps }) {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ left: 10 }}
      onClick={() => {
        router.push(`/hotel/${props.hotel.id}`);
      }}
      className="flex w-full relative flex-col justify-between overflow-hidden rounded-xl"
    >
      <div
        // style={{
        //   backgroundImage: `url(img/hotel/${props.hotel.id}/${props.hotel.pic[0]})`,
        // }}
        className="w-[100%]    bg-cover bg-center  h-40 mx-auto text-white p-3 shadow-lg text-start hover:bg-zinc-100 rounded-2xl flex overflow-hidden"
      >
        <div className="absolute inset-0 bg-black rounded-2xl opacity-40 z-10"></div>
        <Image
          alt="hotel"
          src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
          objectFit="cover"
          layout="fill"
          className="absolute w-full left-0"
        />
        <div className="w-full flex justify-between z-10">
          <div className="min-w-[50%]  ">
            <p className=" text-2xl font-bold">{props.hotel.name}</p>
            <div className="flex mt-2 -ml-1">
              <div
                className="h-7 w-7 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(/img/homepage/ping.png)` }}
              ></div>
              <p className="mt-1 font-bold ml-1 text-lg">
                {props.hotel.address}
              </p>
            </div>
          </div>
          <div className="w-full text-end">
            <div className="flex h-40 flex-col justify-between">
              <div>
                <div className=" font-bold text-3xl ">
                  {props.hotel.price} ฿
                </div>
                <p>/ night</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className=" space-x-2 z-10 w-full flex p-3">
          {props.hotel.tag.map((tag, index) => {
            return (
              <div
                className=" px-3 py-1 hover:bg-zinc-200 transition-colors duration-150 bg-zinc-100 rounded-md"
                key={index}
              >
                {tag}
              </div>
            );
          })}
        </div>
        <div className="flex z-10 space-x-1 px-3 text-xl items-center text-white">
          <p>{props.hotel.rating}</p>
          <Rating
            value={props.hotel.rating}
            precision={0.1}
            readOnly
            className=""
          ></Rating>
        </div>
      </div>
    </motion.button>
  );
}
