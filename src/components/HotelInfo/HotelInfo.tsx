import craeteAppointment from "@/libs/createAppointment";
import { HotelProps, PromotionProps } from "../../../@types/type";
import { ReviewCard } from "./ReviewCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { set } from "mongoose";
import { PromotionDropDown } from "./PromotionDropDown";
import { Rating } from "@mui/material";
import { createReviews } from "@/libs/createReviews";
import { authOptions } from "@/libs/authOptions";

export function HotelInfo(props: {
  hotel: HotelProps;
  promotion: PromotionProps[];
  reviewCheck: boolean;
  setReviewCheck: (check: boolean) => void;
}) {
  const sumReview =
    props.hotel.review.reduce((sum, review) => {
      return sum + Number(review.rating);
    }, 0) / props.hotel.review.length;
  const { data: session } = useSession();
  console.log(session);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [discount, setDiscount] = useState(0);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  let bookingday =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  if (bookingday < 0 || bookingday > 3) {
    bookingday = -1;
  }
  useEffect(() => {
    scrollToBottom();
  }, [props.hotel.review]);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };
  const handleOnSent = async () => {
    // clear input
    setReview("");
    setRating(0);
    try {
      if (session) {
        await createReviews(rating, review, props.hotel.id, session.user._id);
      } else {
        throw new Error("Session is null");
      }
    } catch (error) {
      toast.error("Error Booking");
      scrollToBottom();
      console.log(error);
    }
    toast.success("Review Sent");
    props.setReviewCheck(!props.reviewCheck);
  };

  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  return (
    <div className=" px-[10%] mt-10   text-[#15439C]">
      <ImageHotel pic={props.hotel.pic} id={props.hotel.id}></ImageHotel>
      <div className="  my-10 flex w-full space-x-4">
        <div className="w-2/3 space-y-4 ">
          <BasicInfo {...props.hotel}></BasicInfo>
          <div className="bg-white  py-4 w-full border-[#15439C] border-[3px] rounded-2xl p-2 px-4">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-semibold ml-2">
                Reviews ({props.hotel.review.length})
              </p>
              <div className="flex space-x-2 text-lg items-center">
                <p className=" font-semibold">
                  {Math.round(sumReview * 100) / 100}{" "}
                </p>
                <Rating
                  value={sumReview}
                  readOnly
                  precision={0.1}
                  className=" text-[#15439C]"
                ></Rating>
              </div>
            </div>
            <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
            <div
              ref={chatMessagesRef}
              className="space-y-3 w-full h-[17rem]  overflow-y-scroll overflow-x-hidden no-scrollbar "
            >
              {props.hotel.review.map((review, index) => {
                return <ReviewCard review={review} key={index}></ReviewCard>;
              })}
            </div>
            <InputPanel
              review={review}
              handleOnSent={handleOnSent}
              Rating={rating}
              setRating={setRating}
              setReview={setReview}
            ></InputPanel>
          </div>
        </div>
        <div className="w-1/3 ">
          <div className="w-full h-full bg-white border-[3px] text-[#15439C] rounded-lg p-4 border-[#15439C]">
            <p className=" text-end text-2xl font-bold">
              Total :{" "}
              <span className="text-[2.5rem]">
                {bookingday == -1
                  ? `Error Booking`
                  : `${
                      (props.hotel.price * bookingday * (100 - discount)) / 100
                    }฿ `}
                <span className="text-2xl">{`${
                  discount > 0 ? ` (discount ${discount}%)` : ``
                }`}</span>
              </span>
            </p>
            <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
            <p className="  text-2xl font-bold">
              Total :{" "}
              <span className="text-4xl">
                {(props.hotel.price * (100 - discount)) / 100} ฿{" "}
              </span>{" "}
              <span className="text-lg font-normal">
                / night{" "}
                <span className="text-sm">{`${
                  discount > 0 ? ` (discount ${discount}%)` : ``
                }`}</span>
              </span>
            </p>
            <div className="w-full py-2  border-2 border-[#15439C] px-5 relative mt-10 rounded-lg text-center">
              <p className="text-2xl font-bold">Data Reserve :</p>
              <div className="flex mt-4 space-x-2 justify-start items-center">
                <p className=" text-lg min-w-20 font-bold">From : </p>

                <input
                  type="date"
                  onChange={(e) => {
                    setStartDate(new Date(e.target.value));
                  }}
                  className="h-10 px-2 rounded-lg w-full bg-white border-2 border-[#15439C]"
                ></input>
              </div>
              <div className="flex mt-4 space-x-2 justify-start items-center">
                <p className=" text-lg  min-w-20 font-bold">To : </p>
                <input
                  onChange={(e) => {
                    setEndDate(new Date(e.target.value));
                  }}
                  type="date"
                  className="h-10 px-2 rounded-lg w-full bg-white border-2 border-[#15439C]"
                ></input>
              </div>
              <p className=" mt-5    mb-5 text-start font-bold text-lg">
                Durations :{" "}
                <span className=" font-normal">
                  {bookingday == -1 ? `Error Booking` : `${bookingday} Days`}
                </span>
              </p>
            </div>
            <PromotionDropDown
              promoion={props.promotion}
              hotel={props.hotel}
              setDiscount={setDiscount}
            ></PromotionDropDown>
            {/* <p>Discount : {discount}</p> */}
            <button
              onClick={async () => {
                try {
                  await craeteAppointment(
                    props.hotel.id,
                    startDate,
                    endDate,
                    session ? session.user.token : ""
                  );
                } catch (error) {
                  toast.error("Error Booking");
                  return;
                }
                toast.success("Booking Success");
              }}
              className=" w-[80%] mx-10  text-3xl text-center  rounded-lg py-3 hover:bg-primary_dark mt-5 text-white bg-primary"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageHotel(props: { pic: string[]; id: string }) {
  return (
    <div className="flex h-80  w-full space-x-4">
      <Image
        alt="hotel"
        src={`/img/hotel/${props.id}/${props.pic[0]}`}
        className=" w-2/5 h-full bg-zinc-600 rounded-lg bg-cover bg-center"
        width={500}
        height={500}
      ></Image>
      <div className=" w-3/5 h-full  space-y-4">
        <div className="h-[9.5rem] relative w-full  space-x-4 flex">
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[1]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[2]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[3]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="h-[9.5rem] relative w-full  space-x-4 flex">
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[4]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[5]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
          <Image
            alt="hotel"
            src={`/img/hotel/${props.id}/${props.pic[6]}`}
            className="w-1/3 h-full  rounded-md bg-cover bg-center"
            width={500}
            height={500}
          ></Image>
        </div>
      </div>
    </div>
  );
}

function BasicInfo(props: HotelProps) {
  return (
    <div className="bg-white py-4 w-full border-[#15439C] border-[3px] rounded-2xl p-2 px-4">
      <p className="text-3xl font-semibold ml-2">{props.name}</p>
      <div className="w-full h-[0.125rem] bg-[#15439C] my-5"></div>
      <div className="pl-7 space-y-3">
        <p className="text-2xl font-semibold">
          Location :{" "}
          <span className="font-normal text-xl">{props.address}</span>
        </p>
        <p className="text-2xl font-semibold">
          Tel : <span className="font-normal text-xl">{props.telephone}</span>
        </p>
        <p className="text-2xl font-semibold">
          Tags :
          <span className="font-normal text-xl">
            {props.tag.map((tag, index) => {
              return (
                <span key={index} className="mx-1">
                  {tag}
                </span>
              );
            })}
          </span>
        </p>
      </div>
    </div>
  );
}

function InputPanel(props: {
  Rating: number;
  review: string;
  setReview: (review: string) => void;
  setRating: (rating: number) => void;
  handleOnSent: () => void;
}) {
  return (
    <div className="h-20 rounded-lg w-full px-3 py-2  space-x-3  items-center overflow-hidden bg-[#15429c71] flex mt-3">
      <textarea
        value={props.review}
        onChange={(event) => {
          props.setReview(event.target.value);
        }}
        className="h-full rounded-md px-3 py-2 w-[70%] focus:outline-none  "
        rows={3}
        cols={50}
        placeholder="Write your riview here..."
      ></textarea>
      <div className="h-full w-[20%] bg-white justify-center flex flex-col rounded-md text-center ">
        <p>{props.Rating}</p>
        <Rating
          name="simple-controlled"
          value={props.Rating ?? 0}
          onChange={(event, newValue) => {
            props.setRating(newValue ?? 0);
          }}
          className="text-[#15439C] mx-auto"
        />
      </div>
      <button
        onClick={props.handleOnSent}
        className="h-10 w-10 bg-cover bg-center hover:scale-110 transition-all duration-200 "
        style={{ backgroundImage: `url(/img/sentbutton.png)` }}
      ></button>
    </div>
  );
}
