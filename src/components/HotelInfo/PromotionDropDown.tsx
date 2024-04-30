import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { HotelProps, PromotionProps } from "../../../@types/type";
import Image from "next/image";

export function PromotionDropDown(props: {
  setPromotion: (promotion: string) => void;
  setDiscount: (discount: number) => void;
  promoion: PromotionProps[];
  hotel: HotelProps;
}) {
  const promotionDefault: PromotionProps = {
    _id: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    hotel: props.hotel,
    pic: "/",
    name: "No Promotion",
    discount: 0,
    coupon: "No Coupon",
  };
  const [selected, setSelected] = useState<PromotionProps>(promotionDefault);
  useEffect(() => {
    props.setDiscount(selected.discount);
    props.setPromotion(selected._id);
  }, [props, selected.discount]);

  return (
    <div className=" mt-5 border-2 border-primary rounded-lg" data-testid="promotiondropdown">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected.name} (discount {selected.discount}%)
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none  px-1 py-1 ${
                    active ? "bg-zinc-100 text-zinc-900" : "text-gray-900"
                  }`
                }
                value={promotionDefault}
              >
                {({ selected }) => (
                  <>
                    <OptionCard
                      hotel={props.hotel}
                      promotion={promotionDefault}
                    ></OptionCard>
                  </>
                )}
              </Listbox.Option>
              {props.promoion.map((promotion, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none  px-1 py-1 ${
                      active ? "bg-zinc-100 text-zinc-900" : "text-gray-900"
                    }`
                  }
                  value={promotion}
                >
                  {({ selected }) => (
                    <>
                      <OptionCard
                        hotel={props.hotel}
                        promotion={promotion}
                      ></OptionCard>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function OptionCard(props: { promotion: PromotionProps; hotel: HotelProps }) {
  return (
    <button className=" flex space-x-2 h-20 w-full my-5  items-center  ">
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
        <p className=" text-[1rem] font-bold">{props.hotel.name}</p>
        <p className="text-sm">{props.promotion.name}</p>
        <p data-testid={`Discount-${props.hotel.name}${props.promotion.discount}`}
        >Discount :{props.promotion.discount}%</p>
        <p>Code : {props.promotion.coupon}</p>
      </div>
    </button>
  );
}
