import { ReviewProps } from "../../@types/type";

export async function createReviews(rating:number,reviewText:string,hotelid:string,id:string) {
  const response = await fetch(`http://localhost:3000/api/v1/hotels/${hotelid}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rating:rating, reviewText:reviewText,userID:id }),
  });
  if (!response.ok) {
    throw new Error("Error failed to fetch");
  }
  const data = await response.json();
  return data;
}