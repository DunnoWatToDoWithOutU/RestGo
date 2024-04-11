export default async function craeteAppointment(id:string,startDate:Date,endDate:Date) {
    console.log(id,startDate,endDate);
    const response = await fetch(`https://rest-go.vercel.app/api/v1/hotels/${id}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
        }),
    });
    if (!response.ok) {
        throw new Error("Error failed to fetch");
    }
    const data = await response.json();
    return data;

    
}