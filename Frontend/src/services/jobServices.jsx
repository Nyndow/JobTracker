const API_URL = import.meta.env.VITE_API_URL;

export async function fetchJobInfos(jobId) {
  const res = await fetch(`${API_URL}/job-info/${jobId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch job information");
  }
  return res.json();
}

export async function createJob({ title, companyId }) {
  const payload = { title };

  const res = await fetch(`${API_URL}/jobs?company_id=${companyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create job: ${errText}`);
  }

  return res.json();
}

export async function createJobInfo(jobId, data) {
  const res = await fetch(`${API_URL}/job-info/?job_id=${jobId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create job info");
  return res.json();
}



export async function fetchSummaryJob(jobId) {
  // Mock JSON data with long summary
  const data = {
    idJob: jobId,
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
mollit anim id est laborum. This is a detailed test summary for the job, providing enough text to test layout and scrolling behavior in your UI."
  };

  return data;
}




