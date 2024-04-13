import React from 'react';
import Image from 'next/image';

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

export default function SortFilter() {
  return (
    <div className=" mx-auto flex mt-1 text-sm text-[#15439C] rounded-md border-2 border-[#15439C] items-center font-bold">
      <div className="flex px-3 space-x-2 ">
        <p>Sort By</p>
        <div className="h-6 w-6 bg-zinc-300"> 
        <Image src={"/sortingIcon/sortByIcon.png"} alt="Sort By Icon" width={24} height={24} />
      </div>
      </div>
      {SortItem.map((item, index) => {
        return (
          <button
            key={index}
            className="flex border-l-2 border-black px-5 py-1  space-x-2 hover:bg-slate-100 "
          >
            <p>{item.name}</p>
            <div className="h-6 w-6 ">
            <Image src={item.img} alt={`${item.name} Icon`} width={200} height={200} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
