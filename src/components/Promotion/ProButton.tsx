"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import Avvvatars from "avvvatars-react";
import { HotelProps, PromotionProps } from "../../../@types/type";
import PromotionCard from "./PromotionCard";

export default function UserDropDown(props: { promotion: PromotionProps[] }) {
  const [hover, setHover] = useState(false);
  return (
    <div className=" text-right">
      <Menu
        as="div"
        className="relative inline-block text-left bg-center self-center bg-cover w-7 h-7"
        style={{ backgroundImage: `url(/img/bell.png)` }}
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md ">
            <ChevronDownIcon aria-hidden="true" className=" opacity-0" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-80 max-h-72 overflow-y-scroll origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {props.promotion.map((promotion, index) => {
                return (
                  <PromotionCard
                    key={index}
                    promotion={promotion}
                    hotel={promotion.hotel}
                  ></PromotionCard>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}
