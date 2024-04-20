"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

export function Payment() {
  return (
    <div className="w-full  text-[#15439C] border-[3px] rounded-2xl p-7 relative border-[#15439C] my-5">
      <p className="absolute left-10 -top-5 px-4 bg-white text-2xl text-[#15439C] font-bold">
        QR Code
      </p>

      <button className=" bg-[#2465E2] text-white font-bold rounded-md px-5 py-2 mt-5">
        Show QR Code
      </button>
    </div>
  );
}
