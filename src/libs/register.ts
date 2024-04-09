export async function register(name:string, email:string, telephone:string, password:string) {
    console.log(name, email, telephone, password)
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:name, email:email, tel:telephone, password:password }),
    });
    const data = await response.json();
    return data;
}
    
