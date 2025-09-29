import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PricingCard from "./components/PricingCard";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState({ total: 0, blue: 0, green: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pricing", {
          credentials: "include",
        });
        const result = await res.json();
        setData(result);

        setStats((prev) => ({
          total: prev.total + 1,
          blue: prev.blue + (result.version === "blue" ? 1 : 0),
          green: prev.green + (result.version === "green" ? 1 : 0),
        }));
      } catch (err) {
        console.error("Error fetching pricing:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white text-3xl font-bold animate-pulse">
        🚀 Loading Premium Plans...
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
