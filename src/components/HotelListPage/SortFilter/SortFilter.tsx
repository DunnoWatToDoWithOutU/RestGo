"use client";
import React, { useState } from "react";
import Image from "next/image";

const SortItem = [
  {
    name: "Price",
    img: "/sortingIcon/priceIcon.png",
  },
  {
    name: "Rating",
    img: "/sortingIcon/ratingIcon.png",
  },
  {
    name: "Location",
    img: "/sortingIcon/distanceIcon.png",
  },
  {
    name: "Name",
    img: "/sortingIcon/nameIcon.png",
  },
];

export default function SortFilter(props: {
  setFiltering: (value: string) => void;
  setMaxtoMin: (value: boolean) => void;
  MaxtoMin: boolean;
}) {
  const [selectedButtonIndexes, setSelectedButtonIndexes] = useState<number>(
    3 //default by name
  );
  const handleSortClick = (index: number) => {
    props.setFiltering(SortItem[index].name.toLowerCase());
    setSelectedButtonIndexes(index);
  };

  return (
    <div className=" mx-auto flex text-sm text-[#15439C] rounded-md border-2 border-[#2465E2] mt-3 md:mt-0 items-center font-bold">
      <div className="flex md:px-3 px-2 md:space-x-2 ">
        <p className="text-sm md:block hidden md:text-xl ml-2">Sort By</p>
        <p className="text-sm md:hidden block md:text-xl  mr-1 md:mr-0">Sort</p>
        <button
          id="sortButton"
          onClick={() => {
            props.setMaxtoMin(!props.MaxtoMin);
          }}
          className="md:h-6 md:w-6 h-4 w-4 bg-[#26cbfc] bg-opacity-40 rounded-md flex items-center justify-center mt-0.5 "
        >
          <Image
            src={"/sortingIcon/sortByIcon.png"}
            alt="Sort By Icon"
            width={20}
            height={20}
          />
        </button>
      </div>
      {SortItem.map((item, index) => {
        return (
          <button
            key={index}
            className="flex border-l-2 border-zinc-200 md:space-x-2 hover:bg-slate-100"
            onClick={() => handleSortClick(index)}
          >
            <div
              className={`${
                selectedButtonIndexes == index
                  ? "bg-[#26cbfc] bg-opacity-40 rounded-md  md:mx-3 mx-1 my-1 md:my-2 md:px-2 md:py-0.5 "
                  : "md:mx-5 md:my-2.5 my-1 mx-1"
              } flex transition-all duration-300 ease-in-out`}
            >
              <p className="md:text-xl text-sm mx-2 md:mx-2">{item.name}</p>
              <div className="md:h-6 md:w-6 md:block hidden ">
                <Image
                  src={item.img}
                  alt={`${item.name} Icon`}
                  width={22}
                  height={22}
                  className="my-1"
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
