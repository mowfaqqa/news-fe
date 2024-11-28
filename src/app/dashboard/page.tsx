/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://news-be-c2t4.onrender.com/api/create",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Blog uploaded successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.log(err);
      setMessage("Failed to upload blog");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={handleLogout} className="text-red-500 underline">
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full md:w-1/2 mx-auto"
      >
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full p-2 rounded text-white"
        >
          Upload News
        </button>
      </form>
    </div>
  );
}
