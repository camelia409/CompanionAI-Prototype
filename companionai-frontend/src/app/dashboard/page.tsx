"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center">📊 Dashboard</h1>
      <p className="text-center">Welcome to your AI-powered health dashboard.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold">💖 Health Metrics</h4>
            <p>Track key health stats like heart rate, sleep, and activity.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold">📅 Wellness Schedule</h4>
            <p>Personalized daily routines for better health.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold">🩺 AI Recommendations</h4>
            <p>Get AI-driven insights for a healthier lifestyle.</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link href="/" className="btn btn-outline-dark">⬅ Back to Home</Link>
      </div>

    </div>
    
  );
}
