"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <h1 className="fw-bold">CompanionAI</h1>
        <p className="lead">Your AI-Powered Health & Wellness Assistant</p>
        <Link href="/dashboard" className="btn btn-primary btn-lg mt-3">Get Started</Link>
      </header>

      {/* How It Works Section */}
      <section className="container my-5">
        <h2 className="text-center fw-bold">How It Works</h2>
        <div className="row mt-4 text-center">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>🩺 AI Health Monitoring</h4>
              <p>Track your heart rate, sleep, steps, and calories burned in real-time.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>💬 AI Chat & Therapy</h4>
              <p>Receive emotional support and wellness guidance through AI-powered conversations.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>🚀 Personalized Insights</h4>
              <p>Get AI-driven recommendations based on your health data and habits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center fw-bold">Key Features</h2>
        <div className="row mt-4 text-center">
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>🌟 Gamification & Rewards</h4>
              <p>Earn points and rewards for maintaining good health habits.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>📊 AI Health Reports</h4>
              <p>Receive weekly and monthly reports with health trends and recommendations.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-4 h-100">
              <h4>🔗 Telemedicine Integration</h4>
              <p>Connect with doctors in real time through secure video consultations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>&copy; 2025 CompanionAI. All Rights Reserved.</p>
        <p>
          <Link href="/privacy" className="text-white">Privacy Policy</Link> | 
          <Link href="/terms" className="text-white"> Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
