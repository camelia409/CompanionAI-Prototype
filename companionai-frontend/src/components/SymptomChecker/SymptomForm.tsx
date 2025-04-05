"use client";

import { useState } from "react";

const SymptomForm: React.FC = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const symptomsArray = symptoms
      .split(",")
      .map((symptom) => symptom.trim())
      .filter((s) => s.length > 0);

    if (symptomsArray.length === 0) {
      setResult("❌ Please enter valid symptoms.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/symptom-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: symptomsArray }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Unknown error occurred");
      }

      const data = await res.json();
      setResult(data.diagnosis || "No diagnosis available.");
    } catch (err: any) {
      console.error("❌ API error:", err);
      setResult("❌ Something went wrong while checking symptoms.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">🩺 Symptom Checker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms (e.g., fever, headache)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Check Symptoms"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 border-l-4 border-blue-500 rounded-md">
          <p className="font-medium">🧠 Diagnosis Result:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
