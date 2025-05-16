"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ChatAssistant from "@/components/ui/ChatAssistant";
import React from "react";

export default function Home() {
  const { t } = useTranslation();
  const [backendMessage, setBackendMessage] = useState("Checking...");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health-check")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not reachable"));
  }, []);

  const navigationItems = [
    { title: "Dashboard", desc: "Track your wellness journey in one place.", link: "/dashboard", icon: "📊" },
    { title: "Symptom Checker", desc: "Instant AI-based health predictions.", link: "/symptom-checker", icon: "🩺" },
    { title: "AI Chatbot", desc: "Emotional support and medical Q&A 24/7.", link: "/chat", icon: "💬" },
    { title: "Community Support", desc: "Real conversations with real people.", link: "/community-support", icon: "🤝" },
    { title: "Scheduler", desc: "Personalized healthcare reminders.", link: "/features/scheduler", icon: "📅" },
    { title: "Nutrition Plans", desc: "Customized food & fitness guidance.", link: "/features/nutrition", icon: "🥗" },
    { title: "Telemedicine", desc: "Connect with certified professionals.", link: "/features/telemedicine", icon: "📱" },
    { title: "Mindfulness Coach", desc: "Boost mental clarity and balance.", link: "/features/coach", icon: "🧘‍♀️" },
  ];

  // Carousel navigation
  const handlePrevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev === 0 ? navigationItems.length - 1 : prev - 1));
  };

  const handleNextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev === navigationItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/homepage.jpg"
            alt="CompanionAI Hero"
            layout="fill"
            objectFit="cover"
            className="scale-110 transform transition-transform duration-10000 animate-subtle-zoom"
            priority
          />
          <div className="absolute inset-0 opacity-40 bg-slate-950"></div>
        </div>

        {/* Header */}
        <header className="absolute top-0 w-full z-30 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Left: CompanionAI Logo */}
            <Link href="/" className="text-3xl font-bold text-blue-900">
              CompanionAI
            </Link>
            {/* Right: Navigation Items */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-blue-900 font-semibold hover:text-blue-600 transition-colors">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-blue-900 font-semibold hover:text-blue-600 transition-colors flex items-center"
                  aria-label="Features"
                >
                  Features ▼
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl py-2 w-48 z-50">
                    <Link href="/features/ai-support" className="block px-4 py-2 text-blue-900 hover:bg-blue-50">
                      🧠 AI-Powered Support
                    </Link>
                    <Link href="/features/healthcare" className="block px-4 py-2 text-blue-900 hover:bg-blue-50">
                      💡 Smart Healthcare
                    </Link>
                    <Link href="/features/community" className="block px-4 py-2 text-blue-900 hover:bg-blue-50">
                      👥 Community & Telemedicine
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/dashboard" className="text-blue-900 font-semibold hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-blue-900 border border-blue-900 hover:bg-blue-50 transition-all"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all"
                aria-label="Sign Up"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative text-center px-4 max-w-5xl mx-auto z-20">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 mt-2">
              CompanionAI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto">
            Empowering your physical, mental, and emotional wellness with cutting-edge AI technology.
          </p>
          <div className="mt-10">
            <Link
              href="#about"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Explore Features"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12 relative">
          About CompanionAI
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-52 bg-yellow-500"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-2xl p-8">
          {/* Left: Image Placeholder */}
          <div className="w-full md:w-1/2">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/companion.jpeg" // Replace with actual image path
                alt="About CompanionAI"
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          {/* Right: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-lg text-gray-700 leading-relaxed">
              CompanionAI is your trusted partner in health and wellness. Powered by advanced AI, our platform offers personalized support through features like symptom checking, emotional guidance, and health tracking. Whether you're managing chronic conditions or seeking mental clarity, we're here to empower you 24/7 with compassionate, intelligent solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Carousel */}
      <section id="features" className="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-100 to-blue-50">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12">
          Our Features
        </h2>
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentFeatureIndex * (100 / 3)}%)` }}
            >
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/3 p-4"
                >
                  <Link href={item.link}>
                    <div className="bg-white rounded-lg shadow-lg p-6 h-64 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all duration-300 border border-blue-200">
                      <span className="text-4xl mb-4">{item.icon}</span>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel Controls */}
          <button
            onClick={handlePrevFeature}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all"
            aria-label="Previous Feature"
          >
            ←
          </button>
          <button
            onClick={handleNextFeature}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all"
            aria-label="Next Feature"
          >
            →
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "10,000+", label: "Global Users", icon: "👥" },
            { value: "24/7", label: "Support Availability", icon: "🕒" },
            { value: "4.8/5", label: "User Rating", icon: "⭐" },
            { value: "8+", label: "Supported Languages", icon: "🌍" },
          ].map((stat, index) => (
            <div key={index} className="group perspective">
              <div className="transform transition-transform duration-500 preserve-3d group-hover:rotate-y-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-200">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl">{stat.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 text-center">{stat.value}</h3>
                <p className="text-gray-600 text-center">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Backend Status */}
      <section className="text-center py-4 bg-white/80 backdrop-blur-sm rounded-lg mx-4 mb-10">
        <small className="text-gray-600">
          Backend Status: <span className="text-green-600">{backendMessage}</span>
        </small>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-6">
        <p className="mb-2">© 2025 CompanionAI</p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy" className="text-white hover:text-blue-200 transition-colors">
            Privacy
          </Link>
          <span>|</span>
          <Link href="/terms" className="text-white hover:text-blue-200 transition-colors">
            Terms
          </Link>
        </div>
      </footer>

      {/* Chat Assistant */}
      <ChatAssistant />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 10s ease-in-out infinite alternate;
        }
        .perspective {
          perspective: 1000px;
        }
        .stat-card-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}