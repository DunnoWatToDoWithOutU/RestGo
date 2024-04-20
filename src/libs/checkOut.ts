export default async function checkOut(id: string, token: string) {
    const response = await fetch(`https://rest-go.vercel.app/api/v2/appointments/${id}/checkOut`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
    });
    const data = await response.json();
    return data;
};
