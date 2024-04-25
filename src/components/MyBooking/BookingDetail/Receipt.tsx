import Image from "next/image";
import { AppointmnetProps, HotelProps, PromotionProps} from "../../../../@types/type";
import { getPromotionbyId } from "@/libs/getPromotionbyId";
import { useEffect, useState } from "react";
import Promotion from "@/models/Promotion";

export function Receipt(props: {
  hotel: HotelProps;
  bookingData: AppointmnetProps;
}) {
  const startDate = new Date(props.bookingData.startDate);
  const endDate = new Date(props.bookingData.endDate);
  const duration =
  (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const base = props.hotel.price * duration;
  const [promotionName, setPromotionName] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const fetchDiscount = async () => {
      const PromotionFetch = await getPromotionbyId(props.bookingData.promotion);
      if(PromotionFetch){
        setDiscount(PromotionFetch[0].discount);
      }
    };
    fetchDiscount();
  }, []);
  return (
    <div className="w-full text-[#15439C] text-center border-[3px] rounded-2xl p-6 relative border-[#15439C] mt-5">
      <p className="font-bold text-center text-xl sm:text-2xl">Receipt</p>

      <div className="mt-2">
        <Image
          alt="hotel image"
          src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
          className="  bg-zinc-600 mx-auto rounded-lg bg-cover bg-center"
          width={300}
          height={300}
        ></Image>
      </div>

      <p className=" text-lg sm:text-xl font-bold my-3">{props.hotel.name}</p>
      <div className="w-[80%] mx-auto text-start space-y-1 mb-3">
        <div><span className="font-bold mr-2">Address : </span> <span>{props.hotel.address}</span></div>
        <p><span className="font-bold mr-2">Tel : </span>{props.hotel.telephone}</p>
      </div>
      <div className="w-[80%] h-[0.125rem] bg-[#15439C] mx-auto mb-3"></div>
      <div className="text-start px-[10%]">
        <div className="flex w-full justify-between">
          <p><span className="font-bold">Price : </span> {props.hotel.price} {" ฿ x "} {duration}{" "}</p>
            
          <p className="font-bold">{base} ฿</p>
        </div>
        {
          discount > 0 && (
          <div className="flex w-full justify-between">
            <p><span className="font-bold">Discount : </span> {promotionName}</p>
            <p className="font-bold mb-1 text-[#D7263D]">{"- "}{discount*base/100} ฿</p>
          </div>
        )}
        <hr className="border-t-3 border-[#15439C]"></hr>
        <div className="bg-blue-200/20 flex w-full justify-between">
          <p className="text-lg font-bold mt-1">Total (THB) :</p>
          <p className="text-lg font-bold">{base - discount*base/100} ฿</p>
        </div>
      </div>
    </div>
  );
}
