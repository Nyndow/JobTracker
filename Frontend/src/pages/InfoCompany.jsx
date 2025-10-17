import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompanyInfos } from "../hooks/useCompany";
import InfoFilterSidebar from "../components/InfoFilterBar";
import InformationList from "../components/InformationList";
import NewCompanyInfo from "../components/NewCompanyInfo"; // <-- updated
import "./InfoCompany.css";

export default function InfoCompany() {
  const { id } = useParams();
  const { info = [], loading, error, createInfo } = useCompanyInfos(id);

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filteredInfo =
    filter === "all"
      ? info
      : Array.isArray(info)
        ? info.filter((item) => item.infoType === filter)
        : [];

  const handleCreate = async (entityType, data) => {
    if (entityType === "company") {
      await createInfo(data); // your hook handles adding & updating state
    }
    // future: add job or other entity types here
  };

  return (
    <div className="info-container">
      {/* Main content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="page-title">Company Information</h1>
        </div>

        <InformationList
          info={filteredInfo}
          loading={loading}
          titleKey="titleCompInfo"
          error={error}
        />
      </div>

      <InfoFilterSidebar
        currentFilter={filter}
        onChange={setFilter}
        onAdd={() => setShowForm(true)}
      />


      {/* Add Company Information Form Modal */}
      {showForm && (
        <NewCompanyInfo
          companyId={id}
          onCreate={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
