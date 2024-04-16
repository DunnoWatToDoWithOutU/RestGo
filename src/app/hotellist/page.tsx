import getHotels from "@/libs/getHotels";
import { SearchBar } from "@/components/HomePage/SearchBar";
import { HotelProps } from "../../../@types/type";
import { HotelListPage } from "@/components/HotelListPage/HotelListPage";

export default async function HotelListWeb() {
  return <HotelListPage></HotelListPage>;
}
