export default async function deletePromotion(promotionId: string) {
  const response = await fetch(
    `https://rest-go.vercel.app/api/v2/promotions/${promotionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error failed to delete promotion");
  }
  const data = await response.json();
  return data;
}
