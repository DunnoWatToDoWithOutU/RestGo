import Image from "next/image";
import { AppointmnetProps, HotelProps } from "../../../../@types/type";

export function Receipt(props: {
  hotel: HotelProps;
  bookingData: AppointmnetProps;
}) {
  const startDate = new Date(props.bookingData.startDate);
  const endDate = new Date(props.bookingData.endDate);
  const duration =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  const total = props.hotel.price * duration;
  return (
    <div className="w-full text-[#15439C] text-center border-[3px] rounded-2xl p-6 relative border-[#15439C]">
      <p className="font-bold text-center text-xl">Receipt</p>

      <div>
        <Image
          alt="hotel image"
          src={`/img/hotel/${props.hotel.id}/${props.hotel.pic[0]}`}
          className="  bg-zinc-600 mx-auto rounded-lg bg-cover bg-center"
          width={300}
          height={300}
        ></Image>
      </div>

      <p className="text-lg font-bold my-3">{props.hotel.name}</p>
      <div
        className="w-[80%] mx-auto text-start space-y-1 mb-3
       "
      >
        <p> {props.hotel.address}</p>
        <p>Tel : {props.hotel.telephone}</p>
      </div>
      <div className="w-[80%] h-[0.125rem] bg-[#15439C] mx-auto mb-3"></div>
      <div className="text-start px-[10%]">
        <div className="flex w-full justify-between">
          <p className="font-bold">
            Price :{props.hotel.price} {" ฿ x "} {duration}{" "}
          </p>
          <p className="font-bold">{total} ฿</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Total (THB) :</p>
          <p className="font-bold">{total} ฿</p>
        </div>
      </div>
    </div>
  );
}
