import { useParams, useNavigate } from "react-router-dom";
import { useGetJobsCompany, useCompanyContacts, useCompanySummary }
  from "../hooks/useCompany";
import "./Company.css";

export default function CompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { jobs, loading: jobsLoading, error: jobsError } = useGetJobsCompany(id);
  const { contacts, loading: contactsLoading, error: contactsError } = useCompanyContacts(id);
  const { summary, loading: summaryLoading, error: summaryError } = useCompanySummary(id);

  return (
    <div className="company-container">

      {/* Button to Company Information Page */}
      <div className="mb-6">
        <button
          className="info-button"
          onClick={() => navigate(`/app/company/${id}/info`)}
        >
          Go to Company Information
        </button>

      </div>

      {/* Jobs list */}
      <h2 className="section-title">Jobs</h2>
      {jobsLoading && <p className="loading-text">Loading jobs...</p>}
      {jobsError && <p className="error-text">{jobsError}</p>}
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li
            key={job.idJob}
            className="job-link"
            onClick={() => navigate(`/app/jobs/${job.idJob}`)}
          >
            {job.title}
          </li>
        ))}
      </ul>

      {/* Company Summary */}
      <h2 className="section-title">Company Summary</h2>
      {summaryLoading && <p className="loading-text">Loading summary...</p>}
      {summaryError && <p className="error-text">{summaryError}</p>}
      {summary && <div className="summary-card">{summary.summary}</div>}

      {/* Contacts list */}
      <h2 className="section-title">Contacts</h2>
      {contactsLoading && <p className="loading-text">Loading contacts...</p>}
      {contactsError && <p className="error-text">{contactsError}</p>}
      {contacts.map((c) => (
        <div key={c.idContact} className="contact-card">
          <p className="contact-name">{c.firstName} {c.lastName} – {c.position}</p>
          <p className="contact-info">{c.email} {c.phone && <> | {c.phone}</>}</p>
        </div>
      ))}

    </div>
  );
}
