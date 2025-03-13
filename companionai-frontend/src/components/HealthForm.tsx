"use client";
import { useState } from "react";

export default function HealthForm({ onUpdate }: { onUpdate: (data: any) => void }) {
  const [formData, setFormData] = useState({
    heartRate: "",
    sleepHours: "",
    steps: "",
    caloriesBurned: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      heartRate: parseInt(formData.heartRate) || 0,
      sleepHours: parseFloat(formData.sleepHours) || 0,
      steps: parseInt(formData.steps) || 0,
      caloriesBurned: parseInt(formData.caloriesBurned) || 0,
    });

    // Reset form after submission
    setFormData({
      heartRate: "",
      sleepHours: "",
      steps: "",
      caloriesBurned: "",
    });
  };

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h4 className="fw-bold text-primary">📝 Update Health Data</h4>
      <form onSubmit={handleSubmit}>
        {[
          { label: "💖 Heart Rate (bpm)", name: "heartRate", type: "number" },
          { label: "🛌 Sleep Hours", name: "sleepHours", type: "number", step: "0.1" },
          { label: "🚶 Steps Walked", name: "steps", type: "number" },
          { label: "🔥 Calories Burned", name: "caloriesBurned", type: "number" },
        ].map(({ label, name, type, step }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              step={step}
              className="form-control"
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">✅ Update Data</button>
      </form>
    </div>
  );
}
