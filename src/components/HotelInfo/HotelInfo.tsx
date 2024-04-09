import { HotelProps } from "../../../@types/type";
import { ReviewCard } from "./ReviewCard";

export function HotelInfo(props: HotelProps) {
  return (
    <div className=" px-[10%] mt-10   text-[#15439C]">
      <ImageHotel pic={props.pic}></ImageHotel>
      <div className="  my-10 flex w-full space-x-4">
        <div className="w-2/3 space-y-4 ">
          <BasicInfo {...props}></BasicInfo>
          <div className="bg-white py-4 w-full border-[#15439C] border-[3px] rounded-2xl p-2 px-4">
            <p className="text-3xl font-semibold ml-2">Reviews</p>
            <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
            <div className="space-y-3 w-full h-[17rem] overflow-y-scroll overflow-x-hidden no-scrollbar ">
              <ReviewCard></ReviewCard>
              <ReviewCard></ReviewCard>
              <ReviewCard></ReviewCard>
              <ReviewCard></ReviewCard>
              <ReviewCard></ReviewCard>
            </div>
          </div>
        </div>
        <div className="w-1/3 ">
          <div className="w-full h-full bg-white border-[3px] text-[#15439C] rounded-lg p-4 border-[#15439C]">
            <p className=" text-end text-2xl font-bold">
              Total : <span className="text-[2.5rem]">{props.price} ฿</span>
            </p>
            <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
            <p className="  text-2xl font-bold">
              Total : <span className="text-4xl">{props.price} ฿ </span>{" "}
              <span className="text-lg font-normal">/ night</span>
            </p>
            <div className="w-full py-2  border-2 border-[#15439C] px-5 relative mt-10 rounded-lg text-center">
              <p className="text-2xl font-bold">Data Reserve :</p>
              <div className="flex mt-4 space-x-2 justify-start items-center">
                <p className=" text-lg min-w-20 font-bold">From : </p>
                <div className="h-10 rounded-lg w-full bg-white border-2 border-[#15439C]"></div>
              </div>
              <div className="flex mt-4 space-x-2 justify-start items-center">
                <p className=" text-lg  min-w-20 font-bold">To : </p>
                <div className="h-10 rounded-lg w-full bg-white border-2 border-[#15439C]"></div>
              </div>
              <p className=" mt-5    mb-5 text-start font-bold text-lg">
                Durations : <span className=" font-normal">2 days</span>
              </p>
            </div>
            <div className=" w-[80%] text-3xl text-center  rounded-lg py-3 hover:bg-primary_dark mt-10 mx-auto text-white bg-primary">
              Reserve
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageHotel(props: { pic: string }) {
  return (
    <div className="flex h-80  w-full space-x-4">
      <div
        className=" w-2/5 h-full bg-zinc-600 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${props.pic})` }}
      ></div>
      <div className=" w-3/5 h-full  space-y-4">
        <div className="h-[9.5rem] w-full  space-x-4 flex">
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
        </div>
        <div className="h-[9.5rem] w-full  space-x-4 flex">
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
          <div className="w-1/3 h-full bg-zinc-400 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

function BasicInfo(props: HotelProps) {
  return (
    <div className="bg-white py-4 w-full border-[#15439C] border-[3px] rounded-2xl p-2 px-4">
      <p className="text-3xl font-semibold ml-2">{props.name}</p>
      <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
      <div className="pl-7 space-y-3">
        <p className="text-2xl font-semibold">
          Location :{" "}
          <span className="font-normal text-xl">{props.location}</span>
        </p>
        <p className="text-2xl font-semibold">
          Tel : <span className="font-normal text-xl">{props.location}</span>
        </p>
        <p className="text-2xl font-semibold">
          Tags : <span className="font-normal text-xl">{props.location}</span>
        </p>
      </div>
    </div>
  );
}
