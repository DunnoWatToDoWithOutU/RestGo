export async function login(email: string, password: string) {
    const response = await fetch(`https://rest-go.vercel.app/api/v2/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        credentials: "include",
    });
    if (!response.ok) {
        
        throw new Error("Error failed to fetch");
    }
    const data = await response.json()
    return data;
}