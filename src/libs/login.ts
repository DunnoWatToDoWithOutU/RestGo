import { toast } from "sonner";

export async function login(email: string, password: string) {
    const response = await fetch("https://rest-go.vercel.app/api/v1/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    if (!response.ok) {
        
        throw new Error("Error failed to fetch");
    }
    const data = await response.json()
    return data;
}