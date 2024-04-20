export default async function updateBooking(bookingID: string){
    const response = await fetch(`https://rest-go.vercel.app/api/v2/appointments/${bookingID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    // console.log(response);
    if (!response.ok) {
        throw new Error("Error failed to fetch!");
    }
    
    const data = await response.json();
    // console.log("data",data);
    return data;
}