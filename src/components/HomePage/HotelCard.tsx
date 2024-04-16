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
      // style={{
      //   backgroundImage: `url(img/hotel/${props.hotel.id}/${props.hotel.pic[0]})`,
      // }}
      className="w-[100%]   relative  bg-cover bg-center  h-48 mx-auto text-white p-3 shadow-lg text-start hover:bg-zinc-100 rounded-2xl flex overflow-hidden hotel-card"
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
            <p className="mt-1 font-bold ml-1 text-lg">{props.hotel.address}</p>
          </div>
        </div>
        <div className="w-full text-end">
          <div className="flex h-40 flex-col justify-between">
            <div>
              <div className=" font-bold text-3xl ">{props.hotel.price} ฿</div>
              <p>/ night</p>
            </div>
            <div className="flex space-x-3 text-lg font-bold">
              <Rating
                precision={0.1}
                name="half-rating-read"
                //value={5}
                readOnly
                className="ml-auto text-[#fff]"
              />
              {/* <p>{props.stars}</p> */}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
