import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

function PricingPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
  fetch("http://localhost:5000/api/pricing", { credentials: "include" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch pricing data");
      return res.json();
    })
    .then((json) => setData(json))
    .catch((err) => {
      console.error("Error fetching pricing:", err);
      setError("Unable to load pricing plans. Please try again later.");
    });
}, []);


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 text-white text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 text-white text-xl font-semibold">
        Loading Pricing Plans...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 text-white p-8">
      {/* Header */}
      <h2 className="text-center text-4xl font-extrabold mb-10">
        {data.title}{" "}
        <span className="text-pink-400">(v{data.version})</span>
      </h2>
      <p className="text-center text-lg text-gray-300 mb-12">
        {data.subtitle}
      </p>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-6 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-extrabold mb-4">
              ${plan.price}/{plan.period}
            </p>
            <p className="mb-4 text-gray-200">{plan.description}</p>

            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="text-green-300 w-5 h-5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-pink-400 hover:text-white transition">
              {plan.buttonText} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingPage;
