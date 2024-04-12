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
        <div className="flex flex-row items-center rounded-md border border-[#2465E2] rounded-xl p-2 my-3 mx-12 border-4">
            <span className="font-bold text-[9pt] sm:text-[11pt] md:text-[14pt] text-[#15439C] whitespace-nowrap mr-3">Tag Filter: </span>
            <div className="flex flex-row justify-evenly">
                {mockTags.map((tag, index) => (
                    <TagPiece image={`Tags/${tag[0]}`} type={tag[1]} />
                ))}
            </div>
        </div>
    );
}