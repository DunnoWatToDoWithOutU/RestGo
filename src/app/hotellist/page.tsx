import Image from "next/image";
import { TagContainer } from "@/components/HotelListPage/TagFilter/TagContainer";
import SortFilter from "@/components/HotelListPage/SortFilter/SortFilter";
import { HotelList } from "@/components/HomePage/HotelList";
import getHotels from "@/libs/getHotels";
import { SearchBar } from "@/components/HomePage/SearchBar";

export default async function HotelListPage() {
  const hotels = await getHotels();
  return (
    <main className="w-full flex flex-col justify-start items-center px-[10%]">
      <div className="relative  w-[40%] mt-10 text-center">
        <p className=" text-3xl font-bold mb-5 text-[#15439C]">Hotel List</p>
        <div className="flex justify-between items-center">
          <SearchBar></SearchBar>
          </div>
      </div>
      <TagContainer></TagContainer>
      <SortFilter></SortFilter>
      <HotelList HotelData={hotels}></HotelList>
    </main>
  );
}
