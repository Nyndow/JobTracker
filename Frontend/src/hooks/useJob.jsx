import { useEffect, useState } from "react";
import {
  fetchSummaryJob, fetchJobInfos, createJobInfo, createJob
}
  from "../services/jobServices";

// JOB SUMMARY
export function useJobSummary(jobId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const loadSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSummaryJob(jobId);
        setSummary(data);
      } catch (err) {
        setError(err.message || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [jobId]);

  return { summary, loading, error };
}

//GET AND CREATE INFORMATIONS JOB
export function useJobInfos(jobId) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch infos
  useEffect(() => {
    if (!jobId) return;

    const loadInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobInfos(jobId);
        setInfo(data);
      } catch (err) {
        setError(err.message || "Failed to load job information");
      } finally {
        setLoading(false);
      }
    };

    loadInfo();
  }, [jobId]);

  // create info
  const createInfo = async (newInfo) => {
    setLoading(true);
    try {
      const created = await createJobInfo(jobId, newInfo);
      setInfo((prev) => [...prev, created]); // update local state
      return created;
    } catch (err) {
      setError(err.message || "Failed to create info");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { info, loading, error, createInfo };
}

export function useCreateJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createJob(jobData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}




