export default async function checkIn(id: string, token: string) {
  const response = await fetch(
    `https://rest-go.vercel.app/api/v2/appointments/${id}/checkIn`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
