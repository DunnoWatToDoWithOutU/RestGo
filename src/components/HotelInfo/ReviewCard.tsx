import Avvvatars from "avvvatars-react";
import { ReviewProps } from "../../../@types/type";
import { Rating } from "@mui/material";

export function ReviewCard(props: { review: ReviewProps }) {
  return (
    <div className=" py-3  w-full space-x-3  relative bg-white border-[#15439C] items-center px-3 flex border-2">
      <div className=" h-14 min-w-12 rounded-full ">
        <Avvvatars value={props.review.user.name ?? ""} size={48} />
      </div>
      <div className=" flex flex-col text-wrap  w-full">
        <p className=" font-bold md:text-lg text-sm w-[60%]">
          {props.review.user.name}
        </p>
        <div className="text-ellipsis md:text-base text-sm w-[50%] whitespace-normal">
          {props.review.reviewText}
        </div>
      </div>
      <div className="h-10 w-32 absolute right-2 top-5 flex items-center">
        <p className="md:text-lg text-sm font-bold mr-1">
          {props.review.rating.toString()}
        </p>
        <Rating
          value={props.review.rating as number}
          readOnly
          className="text-[#15439C] text-[1.2rem]"
        ></Rating>
      </div>
    </div>
  );
}
