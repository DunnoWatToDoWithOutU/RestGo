export async function getPromotion(hospitalID: string) {
  const response = await fetch(
    `http://localhost:3000/api/v2/promotions/${hospitalID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error failed to fetch");
  }
  const data = await response.json();
  return data;
}
