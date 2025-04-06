"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState("Checking...");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health-check")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not reachable"));
  }, []);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#FFF7FD", minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <div className="position-relative" style={{ height: "100vh" }}>
        <Image
          src="/homepage.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Overlaid Content */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 2 }}>
          {/* HEADER NAVBAR */}
          <nav className="navbar navbar-expand-lg px-4 shadow-sm" style={{ backgroundColor: "#FFF0FA", padding: "1rem" }}>
            <div className="container-fluid d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <Link className="navbar-brand fw-bold text-primary fs-3" href="/">CompanionAI</Link>
                <ul className="navbar-nav d-none d-lg-flex flex-row gap-3">
                  <li className="nav-item">
                    <Link className="nav-link text-primary fw-semibold" href="/">Home</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle btn btn-link text-primary fw-semibold"
                      style={{ textDecoration: "none" }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      Features
                    </button>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} style={{ backgroundColor: "#FFF7FD" }}>
                      <li><Link className="dropdown-item" href="/features/ai-support">🧠 AI-Powered Support</Link></li>
                      <li><Link className="dropdown-item" href="/features/healthcare">💡 Smart Healthcare</Link></li>
                      <li><Link className="dropdown-item" href="/features/community">👥 Community & Telemedicine</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-primary fw-semibold" href="/dashboard">Dashboard</Link>
                  </li>
                </ul>
              </div>

              {/* Right Buttons */}
              <div className="d-flex align-items-center gap-2">
                <Link href="/login" className="btn btn-outline-primary rounded-pill px-4">Login</Link>
                <Link href="/signup" className="btn btn-primary rounded-pill px-4">Sign Up</Link>
              </div>
            </div>
          </nav>

          {/* HERO TEXT */}
          <div className="d-flex flex-column justify-content-center align-items-center text-center h-100"
            style={{ backgroundColor: "rgba(255,247,253,0.85)", backdropFilter: "blur(6px)" }}>
            <h1 className="display-2 fw-bold text-primary mb-3">Welcome to CompanionAI 💖</h1>
            <p className="lead mb-4 text-secondary px-3" style={{ maxWidth: "700px" }}>
              Empowering physical, mental, and emotional wellness with AI.
            </p>
          </div>
        </div>
      </div>

      {/* BACKEND STATUS */}
      <section className="text-center py-3">
        <small className="text-muted">Backend Status: <span className="text-success">{backendMessage}</span></small>
      </section>

      {/* FEATURES CARD GRID SECTION */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5" style={{ color: "#5B2A8A" }}>
          🚀 Discover What CompanionAI Can Do
        </h2>
        <div className="row g-4">
          {[
            {
              title: "Dashboard",
              icon: "📊",
              desc: "Track your wellness journey in one place.",
              link: "/dashboard",
            },
            {
              title: "Symptom Checker",
              icon: "🩺",
              desc: "Instant AI-based health predictions.",
              link: "/symptom-checker",
            },
            {
              title: "AI Chatbot",
              icon: "💬",
              desc: "Emotional support and medical Q&A 24/7.",
              link: "/chat",
            },
            {
              title: "Community Support",
              icon: "🤝",
              desc: "Real conversations with real people.",
              link: "/community-support",
            },
            {
              title: "Scheduler",
              icon: "📅",
              desc: "Personalized healthcare reminders.",
              link: "/features/scheduler",
            },
            {
              title: "Nutrition Plans",
              icon: "🥗",
              desc: "Customized food & fitness guidance.",
              link: "/features/nutrition",
            },
            {
              title: "Telemedicine",
              icon: "📱",
              desc: "Connect with certified professionals.",
              link: "/features/telemedicine",
            },
            {
              title: "Mindfulness Coach",
              icon: "🧘‍♀️",
              desc: "Boost mental clarity and balance.",
              link: "/features/coach",
            },
          ].map((f, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <Link href={f.link} className="text-decoration-none">
                <div
                  className="card h-100 p-4 border-0 shadow-sm hover-shadow rounded-4"
                  style={{
                    background: "#FFF6FB",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                >
                  <div
                    className="fs-1 mb-3"
                    style={{ color: "#B23EFF" }}
                  >
                    {f.icon}
                  </div>
                  <h5 className="fw-bold text-dark">{f.title}</h5>
                  <p className="text-muted">{f.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-1">&copy; 2025 CompanionAI</p>
        <Link href="/privacy"><span className="text-white me-2">Privacy</span></Link>|
        <Link href="/terms"><span className="text-white ms-2">Terms</span></Link>
      </footer>

      {/* BUTTON HOVER STYLES */}
      <style jsx>{`
        .btn {
          transition: transform 0.2s ease;
        }
        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
