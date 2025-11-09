import React, { useState } from "react";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import "./Dashboard.css";
import { useJobCount } from "../hooks/useHome";
import NewJob from "../components/creater/NewJob"; // ✅ import the modal

export default function Dashboard() {
  const { count, loading, error } = useJobCount();
  const [isNewJobOpen, setIsNewJobOpen] = useState(false); // ✅ modal state

  // Handle loading and error states gracefully
  const jobCountDisplay = loading
    ? "Loading..."
    : error
    ? "Error"
    : count ?? 0;

  const stats = [
    { name: "Total Targeted Jobs", value: jobCountDisplay },
    { name: "Applications Sent", value: 10 },
    { name: "Interviews Scheduled", value: 3 },
  ];

  const recentActivity = [
    { action: "Added a job at Google", time: "2 days ago" },
    { action: "Updated application for Amazon", time: "1 day ago" },
    { action: "Interview scheduled with IBM", time: "3 hours ago" },
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <h1 className="hero-title">Track Your Dream Jobs</h1>
          <p className="hero-subtitle">
            Stay organized and reach your career goals faster.
          </p>
          <div className="hero-buttons">
            <button className="hero-button">
              <BuildingOfficeIcon className="icon-small" />
              Browse Companies
            </button>
            <button
              className="hero-button"
              onClick={() => setIsNewJobOpen(true)} // ✅ open modal
            >
              <PlusCircleIcon className="icon-small" />
              Add New Job
            </button>
          </div>
        </div>
        <BriefcaseIcon className="hero-icon" />
      </section>

      {/* Dashboard Summary */}
      <section>
        <h2 className="section-title">Overview</h2>
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.name} className="stats-card">
              <p className="stats-name">{item.name}</p>
              <p className="stats-value">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((item, index) => (
            <div key={index} className="activity-item">
              <span className="activity-text">{item.action}</span>
              <div className="activity-time">
                <ClockIcon className="icon-tiny" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Modal: Add New Job */}
      {isNewJobOpen && <NewJob onClose={() => setIsNewJobOpen(false)} />}
    </div>
  );
}
