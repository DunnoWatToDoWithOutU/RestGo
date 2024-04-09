import { HotelProps } from "../../../@types/type";
import { HotelCard } from "./HotelCard";

const HotelData: HotelProps[] = [
  {
    name: "Hotel 1",
    price: 100,
    stars: 5,
    location: "Location 1",
    pic: "/img/homepage/hotel1.png",
  },
  {
    name: "Hotel 1",
    price: 100,
    stars: 5,
    location: "Location 1",
    pic: "/img/homepage/hotel2.png",
  },
  {
    name: "Hotel 1",
    price: 100,
    stars: 5,
    location: "Location 1",
    pic: "/img/homepage/hotel3.png",
  },
];

export function HotelList() {
  return (
    <div className="min-h-screen space-y-3  w-full py-10">
      {HotelData.map((hotel, index) => {
        return <HotelCard {...hotel} key={index}></HotelCard>;
      })}
    </div>
  );
}
