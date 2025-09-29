import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import PricingCard from "./components/PricingCard";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState({ totalRequests: 0, blue: 0, green: 0 });
  const hasFetchedPricing = useRef(false);

  // Fetch pricing data once (prevent double fetch)
  useEffect(() => {
    if (hasFetchedPricing.current) return;
    hasFetchedPricing.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pricing", {
          credentials: "include",
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching pricing:", err);
      }
    };

    fetchData();
  }, []);

  // Fetch stats from backend every 2 seconds
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats");
        const result = await res.json();
        setStats(result.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white text-3xl font-bold animate-pulse">
        Loading Premium Plans...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col items-center">
      <Header version={data.version} />

      <div className="grid md:grid-cols-2 gap-10 px-8 mt-12 w-full max-w-6xl">
        {data.plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>

      <Footer stats={stats} />
    </div>
  );
};

export default App;