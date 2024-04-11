export default async function getAppointments(id:string){
    const response = await fetch(`https://rest-go.vercel.app/api/v1/appointment/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    console.log(response);
    if (!response.ok) {
        throw new Error("Error failed to fetch!");
    }
    
    const data = await response.json();
    console.log("data",data);
    return data;
}