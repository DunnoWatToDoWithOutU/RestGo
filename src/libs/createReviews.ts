import { ReviewProps } from "../../@types/type";

export default async function createReviews(rating:number,reviewText:string,hotelid:string,id:string) {
  const response = await fetch(`https://rest-go.vercel.app/api/v2/hotels/${hotelid}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rating:rating, reviewText:reviewText,userID:id }),
  });
    if (!response || !response.ok) {
    throw new Error("Error failed to fetch");
  }
  const data = await response.json();
  return data;
}