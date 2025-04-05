"use client";

import { useState } from "react";
import SymptomForm from "@/components/SymptomChecker/SymptomForm";

const SymptomCheckerPage = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckSymptoms = async (symptoms: string) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/symptom-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      const data = await response.json();
      setResult(data?.diagnosis || "No diagnosis available.");
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setResult("Error processing your request. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SymptomForm onSubmit={handleCheckSymptoms} result={result || undefined} isLoading={loading} />
    </div>
  );
};

export default SymptomCheckerPage;
