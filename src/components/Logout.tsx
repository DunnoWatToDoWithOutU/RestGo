"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();
  return (
    <button
      className="px-3 py-1 text-primary hover:bg-primary hover:text-white border-2 border-primary rounded-full transition-all duration-200"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Logout
    </button>
  );
}
