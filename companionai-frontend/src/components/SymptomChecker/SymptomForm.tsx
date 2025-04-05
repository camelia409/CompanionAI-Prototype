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

  const formatResult = (text: string) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^\s*[-*] (.*)$/gm, "<li>$1</li>")
      .replace(/\n{2,}/g, "</ul><br /><ul>")
      .replace(/\n/g, "<br />");
    return `<ul>${html}</ul>`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4">🩺 Symptom Checker</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter symptoms (e.g., fever, vomiting)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Checking..." : "Check Symptoms"}
              </button>
            </div>
          </form>

          {result && (
            <div
              className="alert alert-info mt-4"
              role="alert"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              <h5 className="alert-heading">🧠 Diagnosis Result</h5>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: formatResult(result) }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomForm;
