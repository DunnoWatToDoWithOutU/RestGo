export default async function checkOut(id: string, token: string) {
  const response = await fetch(
    `http://localhost:3000/api/v2/appointments/${id}/checkOut`,
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
