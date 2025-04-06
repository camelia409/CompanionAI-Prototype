"use client";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRobot, FaPaperPlane, FaUser, FaUsers } from "react-icons/fa";

const motivationalQuotes = [
  "💬 “You are not alone. Take it one step at a time.”",
  "🌼 “It's okay to feel what you're feeling.”",
  "🧘 “Take a deep breath. You're doing your best.”",
  "💙 “Talking helps. I’m here to listen.”",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Hi there 🌼 I'm here to listen and support you. How are you feeling today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Rotate motivational quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (customInput?: string) => {
    const userInput = customInput ?? input.trim();
    if (!userInput) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const formattedResponse = formatResponse(data.response || "I'm here for you, even if I don't have the perfect words right now.");

      setTimeout(() => {
        setMessages([...newMessages, { text: formattedResponse, sender: "ai" }]);
        setLoading(false);
      }, 1000); // Simulated delay for natural feel
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { text: "⚠️ Error: Unable to connect to AI.", sender: "ai" }]);
      setLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    return text
      .replace(/\n{2,}/g, "\n")
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^- (.*?)/gm, "✅ <strong>$1</strong>")
      .replace(/You are not alone/g, "🤝 <strong>You are not alone</strong>")
      .replace(/Take a deep breath/g, "🧘 <strong>Take a deep breath</strong>")
      .replace(/It’s okay to feel this way/g, "💙 <strong>It’s okay to feel this way</strong>")
      .replace(/Here’s what you can try:/g, "🌟 <strong>Here’s what you can try:</strong>");
  };

  return (
    <div className="container d-flex flex-column vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top">
        <div>
          <h4 className="m-0">Emotional Support Chat</h4>
          <small>Your AI Listener 🤗</small>
        </div>
        <FaRobot size={32} className="text-white" />
      </div>

      {/* Motivation Banner */}
      <div className="alert alert-info text-center mb-0">{motivationalQuotes[quoteIndex]}</div>

      {/* Chat Window */}
      <div className="flex-grow-1 overflow-auto p-3 bg-light rounded" style={{ maxHeight: "70vh" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
            {msg.sender === "ai" && <FaRobot size={24} className="me-2 text-primary" />}
            <div
              className={`p-3 rounded shadow-sm ${msg.sender === "user" ? "bg-primary text-white" : "bg-white"}`}
              style={{ maxWidth: "75%", borderRadius: "20px" }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
            {msg.sender === "user" && <FaUser size={24} className="ms-2 text-secondary" />}
          </div>
        ))}
        {loading && <div className="text-muted text-center">⏳ AI is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Mood Quick Replies */}
      <div className="d-flex justify-content-center flex-wrap gap-2 py-2">
        {["😊 Feeling Good", "😟 Feeling Anxious", "😞 Feeling Sad", "😠 Feeling Angry"].map((mood) => (
          <button
            key={mood}
            className="btn btn-outline-secondary btn-sm"
            onClick={() => sendMessage(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="d-flex p-3 border-top bg-white">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          autoFocus
        />
        <button className="btn btn-primary" onClick={() => sendMessage()} disabled={loading}>
          <FaPaperPlane />
        </button>
      </div>

      {/* Optional: Community Support */}
      <div className="text-center py-2">
      <button className="btn btn-link text-primary" onClick={() => window.location.href = "/community-support"}>
        <FaUsers className="me-1" />
        Talk to the community
      </button>
        
      </div>
    </div>
  );
}
