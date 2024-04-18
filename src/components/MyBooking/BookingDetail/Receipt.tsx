import Image from "next/image";
import { HotelProps } from "../../../../@types/type";

export function Receipt({hotel, startDate, endDate} : {
    hotel : HotelProps,
    startDate : Date,
    endDate : Date
}){
    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    const total = hotel.price*duration
    return(
        <div className="w-full text-[#15439C] border-[3px] rounded-2xl p-6 relative border-[#15439C]">
            <p className="font-bold text-center text-xl">
                Receipt
            </p>

            <Image
                alt="hotel image"
                src={`/img/hotel/${hotel.id}/${hotel.pic[0]}`}
                className=" w-2/5 h-full bg-zinc-600 rounded-lg bg-cover bg-center"
                width={500}
                height={500}
            ></Image>

            <p>{hotel.name}</p>
            <hr></hr>
            <p>
                <span className="font-bold">Price : </span>{hotel.price} {" ฿ x "} {duration} 
                <span className="text-right">{total}</span>
            </p>
            <p>
            <span className="font-bold">Total (THB) : </span>
                <span className="text-right">{total}</span>
            </p>
        </div>
    );
}