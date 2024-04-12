import { TagPiece } from "./TagPiece"; 

const mockTags = [
    ["Wifi.png", "Wi-Fi"],
    ["Pool.png", "Pool"],
    ["Parking.png", "Parking"],
    ["AirCon.png", "Air-Con"],
    ["Breakfast.png", "Breakfast"],
    ["Kitchen.png", "Kitchen"],
    ["Pet.png", "Pets"],
    ["Fitness.png", "Fitness"]
]

export function TagContainer() {
    return(
        <div className="flex flex-row items-center rounded-md border border-[#2465E2] rounded-md p-2 my-3 mx-10">
            <span className="font-bold text-[12pt] text-[#15439C] whitespace-nowrap mr-4">Tag Filter: </span>
            <div className="flex flex-row justify-evenly">
                {mockTags.map((tag, index) => (
                    <TagPiece image={`Tags/${tag[0]}`} type={tag[1]} />
                ))}
            </div>
        </div>
    );
}