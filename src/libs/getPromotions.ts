export default async function getPromotions(){
    const response = await fetch(`https://rest-go.vercel.app/api/v1/promotions`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    if(!response.ok){
        console.log(response);
        throw new Error("Error failed to fetch");
    }
    const data = await response.json();
    return data;
}