"use client";

import { set } from "mongoose";
import { useState } from "react";
import PromoitionPopUp from "./PromotionPopUp";
import getPromotions from "@/libs/getPromotions";
import { PromotionProps } from "../../../@types/type";

export default function ProButton(props: { promotion: PromotionProps[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className=" relative">
      <PromoitionPopUp
        promotions={props.promotion}
        show={show}
        setShow={setShow}
      ></PromoitionPopUp>
      <button
        onClick={async () => {
          setShow(!show);
        }}
        className="self-center  w-7 h-7 hover:scale-110 transition-all duration-200 rounded-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/img/bell.png)` }}
      ></button>
    </div>
  );
}
