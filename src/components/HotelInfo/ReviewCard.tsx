import Avvvatars from "avvvatars-react";
import { ReviewProps } from "../../../@types/type";
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star'

export function ReviewCard(props: { review: ReviewProps }) {
  return (
    <div className=" py-3  w-full space-x-3  relative bg-white border-[#15439C] items-center px-3 flex border-2"
    data-testid="review-card-{props.review.user.name}"
    >
      <div className=" h-14 min-w-12 rounded-full ">
        <Avvvatars value={props.review.user.name ?? ""} size={48} />
      </div>
      <div className=" flex flex-col text-wrap  w-full">
        <p className=" font-bold md:text-lg text-sm w-[60%]"
         data-testid="review-username-{props.review.user.name}"
        >
          {props.review.user.name}
        </p>
        <div className="text-ellipsis md:text-base text-sm w-[50%] whitespace-normal"
        data-testid="review-text-{props.review.user.name}"
        >
          {props.review.reviewText}
        </div>
      </div>
      <div className="h-10 absolute right-2 top-5 flex items-center pr-1">
        <p className="md:text-lg text-sm font-bold mr-1"
        data-testid="review-rating-{props.review.user.name}"
        >
          {props.review.rating.toString()}
        </p>
        <span className="hidden sm:inline">
          <Rating
            value={props.review.rating as number}
            readOnly
            className="text-[#15439C] text-[1.2rem]"
          ></Rating>
        </span>
        <span className="inline sm:hidden">
          <StarIcon style={{ color: '#FAAF00' }}/>
        </span>
      </div>
    </div>
  );
}
