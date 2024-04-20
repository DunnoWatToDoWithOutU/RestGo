export default async function craeteAppointment(id:string,startDate:Date,endDate:Date,token:string) {
    console.log(id,startDate,endDate);
    const response = await fetch(`https://rest-go.vercel.app/api/v2/hotels/${id}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
        }),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error failed to fetch");
    }
    return response.status;
}