import Image from "next/image";

export function TagPiece(props: {
  image: string;
  type: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex flex-col items-center border-l-2 transition duration-300 ease-in-out ${
        props.selected ? "bg-gray-100" : ""
      }`}
      onClick={props.onClick}
    >
      <Image
        src={props.image}
        alt={props.type}
        width={20}
        height={20}
        className={`h-[2vw] w-[auto] max-h-[40px] object-contain my-2 mx-3 sm:mx-5 md:mx-7 ${
          props.selected ? "opacity-100" : "opacity-75"
        }`}
      />
      <span
        className={`text-[6pt] sm:text-[10pt] md:text-[12pt] font-bold ${
          props.selected ? "text-[#15439C]" : "text-[#738EC4]"
        }`}
      >
        {props.type}
      </span>
    </button>
  );
}
