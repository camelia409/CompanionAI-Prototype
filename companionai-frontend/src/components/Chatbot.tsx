"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hello! How can I help with your health?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const generateBotResponse = (query: string) => {
    if (query.toLowerCase().includes("heart rate")) return "A healthy heart rate is between 60-100 bpm.";
    if (query.toLowerCase().includes("sleep")) return "Adults need at least 7-9 hours of sleep per night.";
    if (query.toLowerCase().includes("steps")) return "Try to walk at least 10,000 steps daily.";
    return "I'm here to help! Please ask me about health metrics.";
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
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Ask me about your health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
