import Image from "next/image";
import { TagContainer } from "@/components/HotelListPage/TagFilter/TagContainer";
import SortFilter from "@/components/HotelListPage/SortFilter/SortFilter";
import { HotelList } from "@/components/HomePage/HotelList";
import getHotels from "@/libs/getHotels";

export default async function HotelListPage() {
  const hotels = await getHotels();
  return (
    <main className="w-full flex flex-col justify-start items-center px-[10%]">
      <div className="relative  w-[40%] mt-10 text-center">
        <p className=" text-3xl font-bold mb-5 text-[#15439C]">Hotel List</p>
        <input
          type="text"
          id="password"
          className="w-full px-5 py-2 border-2 rounded-full border-blue-800 hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
        ></input>
        <button className="absolute  top-1/2 right-5 -translate-x-1/2 -translate-y-1/2 hover:scale-110">
          {" "}
          <Image
            src={`/icon/searchIcon.png`}
            alt="search Icon"
            width={20}
            height={20}
          ></Image>
        </button>
      </div>
      <TagContainer></TagContainer>
      <SortFilter></SortFilter>
      <HotelList HotelData={hotels}></HotelList>
    </main>
  );
}
