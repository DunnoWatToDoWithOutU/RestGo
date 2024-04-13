"use client";
import { signOut } from "next-auth/react";

export function Logout() {
  return (
    <button
      className="px-3 py-1 text-primary hover:bg-primary hover:text-white border-2 border-primary rounded-full transition-all duration-200"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
