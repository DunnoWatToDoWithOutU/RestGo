export function ReviewCard() {
  return (
    <div className="h-20 w-full space-x-3  bg-white border-[#15439C] items-center px-3 flex border-2">
      <div className=" h-14 min-w-14 rounded-full bg-[#15439C]"></div>
      <div className=" flex flex-col text-wrap  w-full">
        <p className=" font-bold text-lg">Name</p>
        <div className="text-ellipsis whitespace-normal">
          ReviewsReviewsReviewsReviewsReviewsReviewsReviewsReviewsReviews
        </div>
      </div>
    </div>
  );
}
