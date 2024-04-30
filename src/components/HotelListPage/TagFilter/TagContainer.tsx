import { useState } from "react";
import { TagPiece } from "./TagPiece";

const mockTags = [
  ["Wifi.png", "Wi-Fi"],
  ["Pool.png", "Pool"],
  ["Parking.png", "Parking"],
  ["AirCon.png", "Air-Con"],
  ["Breakfast.png", "Breakfast"],
  ["Kitchen.png", "Kitchen"],
  ["Pet.png", "Pets"],
  ["Fitness.png", "Fitness"],
];

export function TagContainer(props: {
  selectedTags: boolean[];
  setSelectedTags: (value: boolean[]) => void;
}) {
  //selectedTags is the Array of boolean that refers which Tags is selected or not. Use it for search...

  const handleTagClick = (index: number) => {
    const newSelectedTags = [...props.selectedTags];
    newSelectedTags[index] = !newSelectedTags[index];
    props.setSelectedTags(newSelectedTags);
  };

  return (
    <div className="flex flex-row items-center border-[#2465E2] rounded-xl md:p-2 px-0 mx-2 p-1 md:my-3 md:mx-12 border-2">
      <span className="font-bold text-xs md:block hidden sm:text-[11pt] md:text-lg   text-[#15439C] whitespace-nowrap md:mr-3 mr-1">
        Tag Filter:{" "}
      </span>
      <div className="flex flex-row justify-evenly">
        {mockTags.map((tag, index) => (
          <TagPiece
            key={index}
            image={`/Tags/${tag[0]}`}
            type={tag[1]}
            selected={props.selectedTags[index]}
            onClick={() => handleTagClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
