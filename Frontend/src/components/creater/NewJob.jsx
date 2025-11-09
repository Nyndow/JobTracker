import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCompanies } from "../../hooks/useCompany";
import { useCreateJob } from "../../hooks/useJob";
import "./NewJob.css";

export default function NewJob({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);
  const { companies, loading: companiesLoading, error } = useFetchCompanies();
  const { create } = useCreateJob();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyId) return alert("Please select a company");

    setLoading(true);
    try {
      const createdJob = await create({
        title,
        description,
        companyId: Number(companyId),
      });

      if (createdJob?.idJob) {
        onClose();
        navigate(`/app/jobs/${createdJob.idJob}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add New Job</h2>

        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Select Company</label>
            {companiesLoading ? (
              <p className="text-sm text-gray-500">Loading companies...</p>
            ) : error ? (
              <p className="text-sm text-red-500">Error: {error}</p>
            ) : (
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
                className="select"
              >
                <option value="">-- Choose a company --</option>
                {companies.map((c) => (
                  <option key={c.idCompany} value={c.idCompany}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="label">Job Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea"
              placeholder="Short description of the job"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
