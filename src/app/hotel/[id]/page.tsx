import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";
import getHotel from "@/libs/getHotel";
import getPromotions from "@/libs/getPromotions";

export default async function HotelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = await getHotel(params.id);
  const promotion = await getPromotions();
  return <HotelInfo {...hotel}></HotelInfo>;
}
