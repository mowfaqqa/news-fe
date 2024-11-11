/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
