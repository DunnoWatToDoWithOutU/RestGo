import { Rating } from "@mui/material";
import { HotelProps } from "../../../@types/type";

export function HotelCard(props: HotelProps) {
  return (
    <div className="w-[100%] mx-auto text-[#15439C] p-3 shadow-lg text-start  space-x-6 bg-zinc-50 rounded-lg flex">
      <div
        className="h-40 min-w-56  rounded-lg  bg-cover bg-center"
        style={{ backgroundImage: `url(${props.pic})` }}
      ></div>
      <div className="w-full flex justify-between">
        <div className="min-w-[50%]  ">
          <p className=" text-2xl font-bold">{props.name}</p>
          <div className="flex mt-2 -ml-1">
            <div
              className="h-7 w-7 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/homepage/ping.png)` }}
            ></div>
            <p className="mt-1 font-bold ml-1 text-lg">{props.location}</p>
          </div>
        </div>
        <div className="w-full text-end">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className=" font-bold text-3xl ">{props.price} ฿</div>
              <p>/ night</p>
            </div>
            <div className="flex space-x-3 text-lg font-bold">
              <Rating
                name="read-only"
                value={props.stars}
                readOnly
                className="ml-auto text-[#15439C]"
              />
              <p>{props.stars}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
