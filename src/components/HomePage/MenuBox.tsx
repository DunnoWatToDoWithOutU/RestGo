"use client";

import { toast } from "sonner";

export function MenuBox() {
  return (
    <div className=" w-[42rem] text-[#15439C] relative p-3 px-5 rounded-md mx-auto h-40 bg-white border-2 border-primary">
      <div className=" flex">
        <div className="h-16 w-[50%] rounded-md flex bg-white border-2 border-[#26CBFC]">
          <button className="h-full w-[50%]  hover:bg-zinc-50 text-sm">
            CheckIn
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkin.png)` }}
            ></div>
          </button>
          <div className="w-[0.105rem] h-[80%] my-auto bg-[#15439C]"></div>
          <button className="h-full hover:bg-zinc-50  w-[50%] text-sm">
            CheckOut
            <div
              className="h-5 w-5 mx-auto mt-1 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/img/checkout.png)` }}
            ></div>
          </button>
        </div>
        <button className="h-16 w-[50%] flex ml-2 hover:bg-zinc-50 bg-white border-2 relative text-center items-center  border-[#26CBFC] rounded-md">
          <div
            className="h-7  w-7 bg-contain bg-center bg-no-repeat  absolute left-5"
            style={{ backgroundImage: `url(/img/addpeople.png)` }}
          ></div>
          <p className="mx-auto font-semibold">Add People</p>
        </button>
      </div>
      <div className="flex justify-center w-full mt-5  space-x-3">
        <p className="py-[0.125rem] bg-white hover:bg-zinc-50 text-sm px-4 rounded-full border-2 border-[#26CBFC]">
          Hotel
        </p>
        <p className="py-[0.125rem] bg-white hover:bg-zinc-50 text-sm px-4 rounded-full border-2 border-[#26CBFC]">
          Hostel
        </p>
        <p className="py-[0.125rem] bg-white hover:bg-zinc-50 text-sm px-4 rounded-full border-2 border-[#26CBFC]">
          Home-Stay
        </p>
        <p className="py-[0.125rem] bg-white hover:bg-zinc-50 text-sm px-4 rounded-full border-2 border-[#26CBFC]">
          Private-stay
        </p>
      </div>
      <button className=" absolute left-[38%] hover:bg-primary_dark -bottom-5 text-white bg-primary px-6 rounded-lg p-1 text-xl">
        Search Here
      </button>
    </div>
  );
}
