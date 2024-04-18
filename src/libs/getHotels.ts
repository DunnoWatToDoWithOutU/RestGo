export default async function getHotels(){
    const response = await fetch(`http://localhost:3000/api/v1/hotels`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error failed to fetch");
    }
    const data = await response.json()
    return data;
} 