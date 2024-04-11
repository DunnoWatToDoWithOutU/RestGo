import { HotelProps } from "../../../@types/type";
import { HotelCard } from "./HotelCard";

export function HotelList(props: { HotelData: HotelProps[] }) {
  return (
    <div className=" mb-20 space-y-3 mt-5  w-full py-10">
      {props.HotelData.map((hotel, index) => {
        return <HotelCard {...hotel} key={index}></HotelCard>;
      })}
    </div>
  );
}
