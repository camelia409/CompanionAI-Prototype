"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help with your health?", sender: "bot" }]);
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
        body: JSON.stringify({ user_input: input }),
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
    <div className="card shadow-sm p-4 mt-4">
      <h4 className="fw-bold">💬 AI Health Chatbot</h4>
      <div className="chat-window border p-3 mb-3" style={{ maxHeight: "250px", overflowY: "auto", borderRadius: "8px" }}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "bot" ? "text-primary" : "text-dark"}>
            <strong>{msg.sender === "bot" ? "Bot: " : "You: "}</strong> {msg.text}
          </div>
        ))}
        {loading && <p className="text-muted">Typing...</p>}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ask me about your health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}
