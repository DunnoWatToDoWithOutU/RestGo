"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();
  return (
    <button
      className="px-3 text-primary hover:underline"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Logout
    </button>
  );
}
