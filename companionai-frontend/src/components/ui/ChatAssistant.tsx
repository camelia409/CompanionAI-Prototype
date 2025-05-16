"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputText("");

    try {
      // Call Gemini AI API (via your backend)
      const response = await axios.post("/api/chat", { message: text });
      const botReply = response.data.reply;

      // Add bot reply to chat
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);

      // Text-to-Speech for bot reply
      const utterance = new SpeechSynthesisUtterance(botReply);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error communicating with Gemini AI:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I encountered an error. Please try again." }]);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else if (speechRecognition) {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
          aria-label="Open Chat Assistant"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">CompanionAI Chat</h3>
            <button onClick={toggleChat} className="text-white" aria-label="Close Chat">
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                aria-label="Send Message"
              >
                ➤
              </button>
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg ${isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300`}
                aria-label={isListening ? "Stop Voice Input" : "Start Voice Input"}
              >
                🎤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;