import { HotelProps } from "../../../@types/type";
import { HotelCard } from "./HotelCard";

const HotelData: HotelProps[] = [
  {
    name: "Tranquil Haven Retreat",
    price: 2000,
    stars: 4.4,
    location: "789 Meadowbrook Lane, Willow Springs, CA 90210",
    pic: "/img/homepage/hotel1.png",
  },
  {
    name: "Serene Summit Lodge",
    price: 999,
    stars: 3.5,
    location: "123 Palm Beach Road, Coral Sands, FL 33160",
    pic: "/img/homepage/hotel2.png",
  },
  {
    name: "Oasis Vista Inn",
    price: 100,
    stars: 5,
    location: "456 Mountain View Drive, Evergreen, CO 80439",
    pic: "/img/homepage/hotel3.png",
  },
];

export function HotelList() {
  return (
    <div className=" mb-20 space-y-3 mt-5  w-full py-10">
      {HotelData.map((hotel, index) => {
        return <HotelCard {...hotel} key={index}></HotelCard>;
      })}
    </div>
  );
}
