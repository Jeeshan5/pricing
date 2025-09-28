import { useEffect, useState } from "react";

function PricingPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/pricing", { credentials: "include" })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error fetching pricing:", err));
  }, []);

  if (!data) return <p>Loading pricing...</p>;

  return (
    <div>
      <h2>Version: {data.version}</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {data.plans.map(plan => (
          <div key={plan.name} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <h3>{plan.name}</h3>
            <p>${plan.price}</p>
            <ul>
              {plan.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingPage;
