"use client";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "👋 Hello! I'm your **AI Companion**. How can I assist you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: sanitizeText(input), sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending message to API:", input);
      const response = await fetch("http://127.0.0.1:8000/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response received:", data);

      let formattedResponse = formatResponse(data.response || "⚠️ Sorry, I couldn't process that.");

      setMessages([...newMessages, { text: formattedResponse, sender: "ai" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { text: "⚠️ Error: Unable to connect to AI.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  // Function to format AI responses cleanly
  const formatResponse = (text: string) => {
    return text
      .replace(/\n{2,}/g, "\n") // Remove excessive blank lines
      .replace(/\n/g, "<br>") // Convert line breaks to HTML
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert *italic* to <em>
      .replace(/^- (.*?)/gm, "✅ <strong>$1</strong>") // Convert "- Item" to bullet points
      .replace(/Symptoms:/g, "🩺 <strong>Symptoms:</strong>") // Add emoji-based headers
      .replace(/Possible Causes:/g, "🧐 <strong>Possible Causes:</strong>")
      .replace(/What To Do:/g, "💡 <strong>What To Do:</strong>")
      .replace(/Tips:/g, "⚡ <strong>Tips:</strong>")
      .replace(/When to Seek Medical Help:/g, "🚨 <strong>When to Seek Medical Help:</strong>")
      .replace(/SEEK IMMEDIATE MEDICAL ATTENTION!/g, "<span style='color:red; font-weight:bold;'>⚠️ SEEK IMMEDIATE MEDICAL ATTENTION!</span>");
  };
  // Function to sanitize user input to prevent XSS
  const sanitizeText = (text: string) => {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  return (
    <div className="container d-flex flex-column vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top">
        <h3 className="m-0">CompanionAI Chat</h3>
        <FaRobot size={32} className="text-white" />
      </div>

      {/* Chat Window */}
      <div className="flex-grow-1 overflow-auto p-3 bg-light rounded" style={{ maxHeight: "75vh" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}
          >
            <div
              className={`p-3 rounded shadow-sm ${msg.sender === "user" ? "bg-primary text-white" : "bg-white"}`}
              style={{ maxWidth: "75%" }}
              dangerouslySetInnerHTML={{ __html: msg.text }} // ✅ Allows formatted text
            />
          </div>
        ))}
        {loading && <div className="text-muted text-center">⏳ Typing...</div>}
        <div ref={chatEndRef} />
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
        <button className="btn btn-primary" onClick={sendMessage} disabled={loading}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
