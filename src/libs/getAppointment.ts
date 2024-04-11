export default async function getAppointments(id:string){
    console.log(`http://localhost:3000/api/v1/appointment/${id}`);
    const response = await fetch(`http://localhost:3000/api/v1/appointment/${id}`,{
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