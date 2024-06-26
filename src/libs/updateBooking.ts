export default async function updateBooking(
  bookingID: string,
  token: string,
  startDate: Date,
  endDate: Date
) {
  const response = await fetch(
    `https://rest-go.vercel.app/api/v2/appointments/${bookingID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      }),
    }
  );
  // console.log(response);
  if (!response.ok) {
    throw new Error("Error failed to fetch!");
  }

  const data = await response.json();
  // console.log("data",data);
  return data;
}
