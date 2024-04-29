export default async function craeteAppointment(
  id: string,
  startDate: Date,
  endDate: Date,
  token: string,
  people: number,
  room: number,
  promotionID: string
) {
  console.log(id, startDate, endDate);
  const response = await fetch(
    `http://localhost:3000/api/v2/hotels/${id}/appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        people: people,
        room: room,
        promotion: promotionID,
      }),
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error failed to fetch");
  }
  return response.status;
}
