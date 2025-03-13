"use client";

export default function AIHealthInsights({ healthData }: { healthData: any }) {
  const generateRecommendations = () => {
    const { heartRate, sleepHours, steps, caloriesBurned } = healthData;
    let recommendations: string[] = [];

    if (heartRate > 100) recommendations.push("🔴 Your heart rate is high! Try deep breathing exercises and meditation.");
    if (heartRate < 60) recommendations.push("🟢 Your heart rate is lower than usual. Consider light exercise to boost circulation.");
    if (sleepHours < 6) recommendations.push("💤 You need more sleep! Aim for 7-8 hours to improve recovery.");
    if (steps < 5000) recommendations.push("🚶 Try to walk at least 10,000 steps daily to improve cardiovascular health.");
    if (caloriesBurned < 200) recommendations.push("🔥 Burn more calories by incorporating 30 mins of moderate exercise.");
    if (recommendations.length === 0) recommendations.push("✅ You're on track! Keep up the healthy lifestyle. 💪");

    return recommendations;
  };

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h4 className="fw-bold text-primary">🩺 AI-Generated Health Insights</h4>
      <ul className="list-group mt-3">
        {generateRecommendations().map((rec, index) => (
          <li key={index} className="list-group-item">{rec}</li>
        ))}
      </ul>
    </div>
  );
}
