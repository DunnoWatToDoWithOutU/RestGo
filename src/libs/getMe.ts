export async function getMe(token: string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/me",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Error failed to fetch");
    }
    const data = await response.json()
    return  data;
}
