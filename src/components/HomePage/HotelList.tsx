import { HotelProps } from "../../../@types/type";
import { HotelCard } from "./HotelCard";

export function HotelList(props: {
  HotelData: HotelProps[];
  checker: boolean;
}) {
  if (props.HotelData.length == 0 && props.checker) {
    return (
      <p className="text-center text-xl font-bold m-20">Hotels loading...</p>
    );
  }

  return (
    <div className=" mb-20 space-y-3 mt-5  w-full py-10">
      {props.HotelData.map((hotel, index) => {
        return <HotelCard hotel={hotel} key={index}></HotelCard>;
      })}
    </div>
  );
}
