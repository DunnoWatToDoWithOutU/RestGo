import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";
import getHotel from "@/libs/getHotel";
import { getPromotion } from "@/libs/getPromotion";
import { HotelProps } from "../../../../@types/type";

export default async function HotelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel: HotelProps = await getHotel(params.id);
  const hotelPromotion = await getPromotion(hotel.id);
  console.log(hotelPromotion);
  return <HotelInfo hotel={hotel} promotion={hotelPromotion}></HotelInfo>;
}
