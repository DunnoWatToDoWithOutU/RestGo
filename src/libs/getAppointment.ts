export default async function getAppointment( id : string){
    const response = await fetch(`http://localhost:3000/api/v1/appointments/${id}`, {
        method: "GET",
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