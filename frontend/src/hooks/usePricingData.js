import { useState, useEffect, useRef } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export const usePricingData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedPricing = useRef(false);

  useEffect(() => {
    if (hasFetchedPricing.current) return;
    hasFetchedPricing.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/pricing`, {
          credentials: 'include',
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching pricing:', err);
        setError('Failed to load pricing data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStats = () => {
  const [stats, setStats] = useState({ totalRequests: 0, blue: 0, green: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/stats`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setStats(result.stats);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats');
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  return { stats, error };
};