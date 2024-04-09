"use client";
import { signOut } from "next-auth/react";

export function Logout() {
  return (
    <button
      className="px-3 text-primary hover:underline"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
