"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlechat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Persona AI Chat</h1>

      {/* Chat Window */}
      <div className="bg-gray-900 w-full max-w-lg rounded-lg shadow-lg p-4 flex flex-col space-y-4 min-h-[300px] mb-4">
        {message && (
          <div className="self-end bg-white text-black px-4 py-2 rounded-lg max-w-[75%]">
            {message}
          </div>
        )}
        {loading && (
          <div className="self-start text-gray-400 text-sm">
            Gemini is typing...
          </div>
        )}
        {response && (
          <div className="self-start bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[75%]">
            {response}
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlechat()}
        />
        <button
          onClick={handlechat}
          className="bg-white text-black px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
