import Image from "next/image";
import { HotelProps, PromotionProps } from "../../../@types/type";
import { useRouter } from "next/navigation";

export default function PromotionCard(props: {
  promotion: PromotionProps;
  hotel: HotelProps;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/hotel/${props.hotel.id}`);
      }}
      className=" flex space-x-2 h-24 py-2 w-full items-center hover:bg-zinc-100 transition-all duration-200 bg-white rounded-lg"
    >
      <div className="h-full w-20 relative rounded-lg overflow-hidden ">
        <Image
          alt="hotel"
          src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
          objectFit="cover"
          layout="fill"
          className="absolute w-full left-0"
        />
      </div>
      <div className=" text-[0.7rem] text-start">
        <p className=" text-[1rem] font-bold"
        data-testid={`noti-${props.hotel.name}`}
        >{props.hotel.name}</p>
        <p className="text-sm">{props.promotion.name}</p>
        <p>Discount :{props.promotion.discount}%</p>
        <p>Code : {props.promotion.coupon}</p>
      </div>
    </button>
  );
}
