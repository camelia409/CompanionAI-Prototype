"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import HealthForm from "@/components/HealthForm";
import AIHealthInsights from "@/components/AIHealthInsights";

export default function Dashboard() {
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    sleepHours: 7,
    steps: 6000,
    caloriesBurned: 300,
  });

  const updateHealthData = (newData: any) => {
    setHealthData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center">📊 Dashboard</h1>
      <p className="text-center">Welcome to your AI-powered health dashboard.</p>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-4 text-center">
            <h4 className="fw-bold">💖 Heart Rate</h4>
            <p>{healthData.heartRate} bpm</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 text-center">
            <h4 className="fw-bold">🛌 Sleep Hours</h4>
            <p>{healthData.sleepHours} hrs</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 text-center">
            <h4 className="fw-bold">🚶 Steps Walked</h4>
            <p>{healthData.steps}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-4 text-center">
            <h4 className="fw-bold">🔥 Calories Burned</h4>
            <p>{healthData.caloriesBurned} kcal</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <AIHealthInsights healthData={healthData} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <HealthForm onUpdate={updateHealthData} />
        </div>
        <div className="col-md-6">
          <Chatbot />
        </div>
      </div>

      <div className="text-center mt-4">
        <Link href="/" className="btn btn-outline-dark">⬅ Back to Home</Link>
      </div>
    </div>
  );
}
