export default async function getHotel(id:string) {
  const response = await fetch(`https://rest-go.vercel.app/api/v2/hotels/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    console.log(response.status)
    throw new Error("Error failed to fetch");
  }
  const data = await response.json();
  return data;
    
}