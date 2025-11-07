import { useEffect, useState } from "react";
import {
  fetchCompanies, fetchJobsCompany, fetchCompanyContacts,
  fetchSummaryCompany, fetchCompanyInfos, createCompanyInfo, createCompany,createCompanyInfoHTML
}
  from "../services/companyServices";

// ALL COMPANIES
export function useFetchCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return { companies, loading, error, reload: loadCompanies };
}


// JOBS BY COMPANY
export function useGetJobsCompany(id) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchJobsCompany(id)
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [id]);

  return { jobs, loading, error };
}

// COMPANY CONTACTS
export function useCompanyContacts(companyId) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    const loadContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCompanyContacts(companyId);
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [companyId]);

  return { contacts, loading, error };
}

// COMPANY SUMMARY
export function useCompanySummary(companyId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    const loadSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSummaryCompany(companyId);
        setSummary(data);
      } catch (err) {
        setError(err.message || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [companyId]);

  return { summary, loading, error };
}

//GET AND CREATE INFORMATIONS COMPANY

export function useCompanyInfos(companyId) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 Fetch all company infos
  const loadInfo = async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanyInfos(companyId);
      setInfo(data);
    } catch (err) {
      setError(err.message || "Failed to load company information");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fetch infos on mount or when companyId changes
  useEffect(() => {
    loadInfo();
  }, [companyId]);

  // ✳️ Create normal (non-HTML/file) info entry
  const createInfo = async (newInfo) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createCompanyInfo(companyId, newInfo);
      setInfo((prev) => [...prev, created]); // ✅ instantly update state
      return created;
    } catch (err) {
      setError(err.message || "Failed to create info");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🌀 Allow manual reload (used after HTML/file creation)
  const reload = async () => {
    await loadInfo();
  };

  return { info, loading, error, createInfo, reload };
}

//create company 

export function useCreateCompany() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (companyData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createCompany(companyData);
      return result;
    } catch (err) {
      setError(err.message || "Failed to create company");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}

//create html
export function useCreateCompanyInfoHTML() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCompanyInfoHTMLHook = async (companyId, data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createCompanyInfoHTML(companyId, data);
      return result;
    } catch (err) {
      setError(err.message || "Failed to create company info HTML");
      throw err; // optional rethrow if component needs to catch it
    } finally {
      setLoading(false);
    }
  };

  return {
    createCompanyInfoHTML: createCompanyInfoHTMLHook,
    loading,
    error,
  };
}


