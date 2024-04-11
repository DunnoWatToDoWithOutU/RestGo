import getHotels from "@/libs/getHotels";
import { HotelList } from "./HotelList";
import { MenuBox } from "./MenuBox";
import { SearchBar } from "./SearchBar";

export async function HomePage() {
  const hotels = await getHotels();
  return (
    <div className="px-[10%] mt-20 text-center ">
      <p className=" text-3xl font-semibold">
        Welcome to REST GO. We will get you to rest in piece.
      </p>
      <SearchBar></SearchBar>
      <MenuBox></MenuBox>
      <HotelList HotelData={hotels}></HotelList>
    </div>
  );
}
