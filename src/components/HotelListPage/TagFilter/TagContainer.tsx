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
    <div className="flex flex-row items-center border-[#2465E2] rounded-xl p-2 my-3 mx-12 border-2">
      <span className="font-bold text-[9pt] sm:text-[11pt] md:text-[14pt] text-[#15439C] whitespace-nowrap mr-3">
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
