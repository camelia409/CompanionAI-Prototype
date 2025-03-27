"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help with your health?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input })
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error: Unable to connect to AI.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Chatbot Header */}
      <h4 className="text-xl font-semibold text-gray-800 mb-4">💬 AI Health Chatbot</h4>

      {/* Chat Window */}
      <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "bot" ? "text-blue-600" : "text-gray-900"}`}>
            <strong>{msg.sender === "bot" ? "Bot: " : "You: "}</strong> {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}
      </div>

      {/* Input Field */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask me about your health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
