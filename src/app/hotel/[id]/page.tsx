import { HotelCard } from "@/components/HomePage/HotelCard";
import { HotelData } from "@/components/HomePage/HotelList";
import { HotelInfo } from "@/components/HotelInfo/HotelInfo";

export default function HotelDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = HotelData[parseInt(params.id)];
  return <HotelInfo {...hotel}></HotelInfo>;
}
