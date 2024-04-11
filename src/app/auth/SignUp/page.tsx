"use client";

import { register } from "@/libs/register";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (password !== rePassword) {
      setError("Password does not match");
      return;
    }
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!telephone) {
      setError("Telephone is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    const response = await register(name, email, telephone, password);
    if (response.error) {
      setError(response.error);
      return;
    }
    router.push("/auth/SignIn");
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-white p-10 my-auto rounded-lg shadow-xl w-[30rem]">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <div className="mt-5 space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Telephone
            </label>
            <input
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
              type="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder=""
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary_dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-primary"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
