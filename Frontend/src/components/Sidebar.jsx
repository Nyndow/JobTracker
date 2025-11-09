import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFetchCompanies } from "../hooks/useCompany";
import NewCompany from "./creater/NewCompany";
import "./Sidebar.css";

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const navigate = useNavigate();
  const { companies, loading, error, reload } = useFetchCompanies();
  const [isCreating, setIsCreating] = useState(false); // modal state

  return (
    <aside className={`sidebar ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      {/* Top Bar */}
      <div className="sidebar-top">
        {isExpanded ? (
          <div className="sidebar-top-row">
            <button onClick={() => navigate("/app/")} className="sidebar-home">
              <HomeIcon className="sidebar-icon" />
            </button>

            <button onClick={() => setIsExpanded(!isExpanded)} className="sidebar-toggle">
              <XMarkIcon className="sidebar-icon" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setIsExpanded(!isExpanded)} className="sidebar-toggle mb-2">
              <Bars3Icon className="sidebar-icon" />
            </button>
            <button onClick={() => navigate("/app/")} className="sidebar-home">
              <HomeIcon className="sidebar-icon" />
            </button>
          </>
        )}
      </div>
      {isExpanded && <div className="sidebar-separator"></div>}
      {/* Company List */}
      {isExpanded && (
        <ul className="sidebar-menu">
          {loading && <p className="sidebar-message">Loading companies...</p>}
          {error && <p className="sidebar-error">{error}</p>}
          {!loading &&
            !error &&
            companies.map((company) => (
              <motion.li
                key={company.idCompany}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => navigate(`/app/company/${company.idCompany}`)}
                  className="sidebar-link sidebar-link-expanded"
                >
                  <span className="sidebar-link-text">{company.name}</span>
                </button>
              </motion.li>
            ))}
        </ul>
      )}

      {isExpanded && <div className="sidebar-separator"></div>}
      {/* Add Company Button */}
      {isExpanded && (
        <div className="sidebar-footer">
          <button onClick={() => setIsCreating(true)} className="sidebar-add-company">
            <PlusCircleIcon className="sidebar-icon-small" />
            <span>Add Company</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {isCreating && (
        <NewCompany
          onClose={() => {
            reload();
            setIsCreating(false);
          }}
          onCreated={() => setIsCreating(false)}
        />
      )}
    </aside>
  );
}
