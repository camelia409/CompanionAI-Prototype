import React from "react";

export default function HealthStats({ healthData }: { healthData: any }) {
  const stats = [
    { label: "💖 Heart Rate", value: `${healthData.heartRate} bpm` },
    { label: "🛌 Sleep Hours", value: `${healthData.sleepHours} hrs` },
    { label: "🚶 Steps Walked", value: healthData.steps },
    { label: "🔥 Calories Burned", value: `${healthData.caloriesBurned} kcal` }
  ];

  return (
    <div className="row mt-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3">
          <div className="card shadow-sm p-4 text-center">
            <h4 className="fw-bold">{stat.label}</h4>
            <p>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
