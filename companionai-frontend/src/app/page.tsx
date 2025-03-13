"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" href="/">🚀 CompanionAI</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <a href="#" className="btn btn-primary ms-3">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="d-flex flex-column justify-content-center align-items-center text-center text-white bg-primary py-5">
        <h1 className="fw-bold">Welcome to CompanionAI</h1>
        <p className="lead">Your AI-powered health & wellness companion</p>
        <div className="mt-3">
          <Link className="btn btn-outline-dark" href="/dashboard">Go to Dashboard</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm p-4">
                <h4 className="fw-bold">🧠 AI Insights</h4>
                <p>Personalized recommendations based on AI analysis.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4">
                <h4 className="fw-bold">📊 Health Tracking</h4>
                <p>Monitor and improve your wellness effectively.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4">
                <h4 className="fw-bold">⚡ Instant Assistance</h4>
                <p>24/7 chatbot support for your queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">© 2025 CompanionAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
