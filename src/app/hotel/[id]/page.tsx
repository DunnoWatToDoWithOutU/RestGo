import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";
import getHotel from "@/libs/getHotel";

export default async function HotelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = await getHotel({ id: params.id });
  return <HotelInfo {...hotel}></HotelInfo>;
}
