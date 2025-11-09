const API_URL = import.meta.env.VITE_API_URL;

export async function fetchJobCount() {
  const res = await fetch(`${API_URL}/jobs/count`);
  if (!res.ok) {
    throw new Error("Failed to fetch job count");
  }
  return res.json();
}
