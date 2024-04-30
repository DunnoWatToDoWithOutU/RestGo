export async function getPromotionbyId(PromotionId: string) {
  const response = await fetch(
    `https://rest-go.vercel.app/api/v2/promotions/byId/${PromotionId}`,
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
