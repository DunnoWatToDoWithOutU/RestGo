import getPromotions from "@/libs/getPromotions";
import ProButton from "./ProButton";
import { PromotionProps } from "../../../@types/type";
import getHotel from "@/libs/getHotel";

export default async function PromotionData() {
  const promotion: PromotionProps[] = await getPromotions();
  const newPromotion: PromotionProps[] = [];
  promotion.map(async (promo, index) => {
    promotion[index].hotelInfo = await getHotel(promo.hotel);
    newPromotion.push(promotion[index]);
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <ProButton promotion={newPromotion}></ProButton>;
}
