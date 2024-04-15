import getPromotions from "@/libs/getPromotions";
import ProButton from "./ProButton";
import { PromotionProps } from "../../../@types/type";
import getHotel from "@/libs/getHotel";

export default async function PromotionData() {
  const promotion: PromotionProps[] = await getPromotions();
  return <ProButton promotion={promotion}></ProButton>;
}
