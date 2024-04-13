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
        <div className="flex justify-between border-2 rounded-full px-3 pr-5 border-blue-800 items-center  focus:outline-none">
          <input
            type="text"
            id="password"
            className="px-5 py-1  w-full focus:outline-none "
            placeholder="Search..."
          ></input>
          <button
            className=" py-2  
         "
          >
            {" "}
            <Image
              src={`/icon/searchIcon.png`}
              alt="search Icon"
              width={20}
              height={20}
            ></Image>
          </button>
        </div>
      </div>
      <TagContainer></TagContainer>
      <SortFilter></SortFilter>
      <HotelList HotelData={hotels}></HotelList>
    </main>
  );
}
