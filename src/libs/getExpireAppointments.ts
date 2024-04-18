export default async function getAppointments(token: string){
    const response = await fetch(`https://rest-go.vercel.app/api/v1/appointments/expire`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
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