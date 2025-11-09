import { useEffect, useState } from "react";
import { fetchJobCount } from "../services/homeServices";

export function useJobCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCount() {
      try {
        setLoading(true);
        const data = await fetchJobCount();
        setCount(data.total_jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCount();
  }, []);

  return { count, loading, error };
}
