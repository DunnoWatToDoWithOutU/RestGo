export async function login(email: string, password: string) {
    const response = await fetch(`http://localhost:3000/api/v1/auth/login`,{
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