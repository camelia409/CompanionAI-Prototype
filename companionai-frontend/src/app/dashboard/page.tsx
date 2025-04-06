"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState } from "react";
import HealthForm from "@/components/HealthForm";
import AIHealthInsights from "@/components/AIHealthInsights";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "💖 Heart Rate (bpm)",
        data: [75, 72, 70, 74, 71, 73, healthData.heartRate],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
      },
      {
        label: "🛌 Sleep Hours",
        data: [6, 7, 8, 6.5, 7.2, 6.8, healthData.sleepHours],
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Steps Walked", "Calories Burned"],
    datasets: [
      {
        label: "Activity Stats",
        data: [healthData.steps, healthData.caloriesBurned],
        backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,206,86,0.6)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(255,206,86,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center">📊 CompanionAI Dashboard</h1>
      <p className="text-center text-muted">
        Visualize your health data and get personalized AI insights.
      </p>

      {/* Summary Cards */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">💖 Heart Rate</h5>
            <p>{healthData.heartRate} bpm</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">🛌 Sleep</h5>
            <p>{healthData.sleepHours} hrs</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">🚶 Steps</h5>
            <p>{healthData.steps}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="fw-bold">🔥 Calories</h5>
            <p>{healthData.caloriesBurned} kcal</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">📈 Weekly Trends</h5>
            <Line data={lineChartData} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">📊 Activity Summary</h5>
            <Bar data={barChartData} />
          </div>
        </div>
      </div>

      {/* AI Health Insights */}
      <div className="row mt-4">
        <div className="col-md-12">
          <AIHealthInsights healthData={healthData} />
        </div>
      </div>

      {/* Health Data Input Form */}
      <div className="row mt-4">
        <div className="col-md-12">
          <HealthForm onUpdate={updateHealthData} />
        </div>
      </div>

      <div className="text-center mt-4">
        <Link href="/" className="btn btn-outline-dark">⬅ Back to Home</Link>
      </div>
    </div>
  );
}
