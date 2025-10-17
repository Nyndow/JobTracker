const API_URL = import.meta.env.VITE_API_URL;

export async function createCompany(data) {
  const res = await fetch(`${API_URL}/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create company");
  }

  return res.json();
}


export async function fetchCompanies() {
  const res = await fetch(`${API_URL}/companies`);
  if (!res.ok) {
    throw new Error("Failed to fetch menu items");
  }
  return res.json();
}

export async function fetchCompany(id) {
  const res = await fetch(`${API_URL}/companies/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch company");
  }
  return res.json();
}

export async function fetchJobsCompany(id) {
  const res = await fetch(`${API_URL}/companies/${id}/jobs`);
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
}

export async function fetchCompanyContacts(companyId) {
  const res = await fetch(`${API_URL}/company-contacts/${companyId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch company contacts");
  }
  return res.json();
}

export async function fetchCompanyInfos(companyId) {
  const res = await fetch(`${API_URL}/company-info/${companyId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch company information");
  }
  return res.json();
}

export async function createCompanyInfo(companyId, data) {
  const res = await fetch(`${API_URL}/company-info/?company_id=${companyId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create company info");
  return res.json();
}



export async function fetchSummaryCompany(companyId) {
  // Mock JSON data with long summary
  const data = {
    idCompany: companyId,
    summary: "Atlassian is an Australian software company best known for creating tools that help teams collaborate, track work, and manage projects. Their most popular products include Jira (for project and issue tracking), Confluence (for team documentation and knowledge management), and Trello (a visual task management tool). Founded in 2002, Atlassian focuses on empowering software developers, IT teams, and business teams to work more efficiently together. Their products are widely used across the globe, from small startups to large enterprises."
  };

  return data;
}


