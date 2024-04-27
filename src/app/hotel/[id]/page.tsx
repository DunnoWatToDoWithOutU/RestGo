"use client";
import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";
import getHotel from "@/libs/getHotel";
import getPromotion from "@/libs/getPromotion";
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
    rating: 0,
  });
  const [promotionData, setPromotionData] = useState<PromotionProps[]>([]);
  const [reviewCheck, setReviewCheck] = useState(false);
  const getHotelData = async () => {
    const hotels = await getHotel(params.id);
    setHotelData(hotels);
    console.log(hotelData, "hotel");
  };

  const getPromotionData = async () => {
    const hotelPromotion = await getPromotion(params.id);
    setPromotionData(hotelPromotion);
    console.log(promotionData, "promotion");
  };

  useEffect(() => {
    getHotelData();
    //make delay
    getPromotionData();
  }, [reviewCheck]);

  return (
    <HotelInfo
      hotel={hotelData}
      reviewCheck={reviewCheck}
      setReviewCheck={setReviewCheck}
      promotion={promotionData}
    ></HotelInfo>
  );
}
