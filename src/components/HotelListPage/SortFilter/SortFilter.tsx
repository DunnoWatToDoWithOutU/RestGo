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
    name: "Distance",
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
  const [selectedButtonIndexes, setSelectedButtonIndexes] = useState<number[]>(
    [0] //default by price
  );//there is no need to make it as array. but i dont know will it break the search algorithm so i keep it array

  const handleSortClick = (index: number) => {
    props.setFiltering(SortItem[index].name.toLowerCase());
    // support more than one type sort
    // if (selectedButtonIndexes.includes(index)) {
    //   setSelectedButtonIndexes(
    //     selectedButtonIndexes.filter((i) => i !== index)
    //   );
    // } else {
    //   setSelectedButtonIndexes([...selectedButtonIndexes, index]);
    // }
    setSelectedButtonIndexes([index]);
  };

  return (
    <div className=" mx-auto flex mt-1 text-sm text-[#15439C] rounded-md border-2 border-[#2465E2] items-center font-bold">
      <div className="flex px-3 space-x-2 ">
        <p className="text-xl ml-2">Sort By</p>
        <button
          id="sortButton"
          onClick={() => {
            props.setMaxtoMin(!props.MaxtoMin);
          }}
          className="h-6 w-6 bg-[#D9D9D980] rounded-md flex items-center justify-center mt-0.5 "
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
            className="flex border-l-2 border-zinc-200 space-x-2 hover:bg-slate-100 "
            onClick={() => handleSortClick(index)}
          >
            <div
              className={`${
                selectedButtonIndexes.includes(index)
                  ? "bg-[#D9D9D980] rounded-md  mx-3 my-2 px-2 py-0.5 "
                  : "mx-5 my-2.5"
              } flex `}
            >
              <p className="text-xl mx-2">{item.name}</p>
              <div className="h-6 w-6 ">
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
