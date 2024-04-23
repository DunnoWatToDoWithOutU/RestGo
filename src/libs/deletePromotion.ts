export default async function deletePromotion(promotionId: string) {
    const response = await fetch(`http://localhost:3000/api/v2/promotions/${promotionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Error failed to delete promotion");
    }
    const data = await response.json();
    return data;
}
