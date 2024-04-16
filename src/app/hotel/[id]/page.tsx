"use client";
import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";
import getHotel from "@/libs/getHotel";
import { getPromotion } from "@/libs/getPromotion";
import { HotelProps, PromotionProps } from "../../../../@types/type";
import { useEffect, useState } from "react";

export default function HotelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [hotelData, setHotelData] = useState<HotelProps>({
    id: "",
    name: "",
    address: "",
    telephone: "",
    price: 0,
    tag: [],
    review: [],
    pic: [],
  });
  const [promotionData, setPromotionData] = useState<PromotionProps[]>([]);
  const getHotelData = async () => {
    const hotels = await getHotel(params.id);
    const hotelPromotion = await getPromotion(hotelData.id);
    setPromotionData(hotelPromotion);
    setHotelData(hotels);
  };
  useEffect(() => {
    getHotelData();
  }, []);

  return <HotelInfo hotel={hotelData} promotion={promotionData}></HotelInfo>;
}
