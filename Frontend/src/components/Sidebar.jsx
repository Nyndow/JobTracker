import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFetchCompanies } from "../hooks/useCompany";
import NewCompany from "./NewCompany";
import "./Sidebar.css";

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const navigate = useNavigate();
  const { companies, loading, error, reload } = useFetchCompanies();
  const [isCreating, setIsCreating] = useState(false); // modal state

  return (
    <aside className={`sidebar ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-3">
        <button onClick={() => setIsExpanded(!isExpanded)} className="sidebar-toggle">
          {isExpanded ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      <ul className="sidebar-menu">
        {isExpanded && <hr className="sidebar-divider" />}

        {/* Company List */}
        {loading && isExpanded && <p className="sidebar-message">Loading companies...</p>}
        {error && isExpanded && <p className="sidebar-error">{error}</p>}
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
                className={`sidebar-link ${isExpanded ? "sidebar-link-expanded" : "sidebar-link-collapsed"
                  }`}
              >
                {isExpanded ? (
                  <span className="sidebar-link-text">{company.name}</span>
                ) : (
                  <span className="sidebar-link-icon">
                    <Bars3Icon className="w-6 h-6 opacity-0" />
                  </span>
                )}
              </button>
            </motion.li>
          ))}
      </ul>

      {/* Add Company Button */}
      {isExpanded && (
        <div className="mt-auto p-3">
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add Company</span>
          </button>
        </div>
      )}

      {/* Modal */}
      {isCreating && (
        <NewCompany
          onClose={() => setIsCreating(false)}
          onCreated={() => {
            setIsCreating(false); // close modal
            reload();              // refresh company list
          }}
        />
      )}
    </aside>
  );
}
