import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useJobInfos } from "../hooks/useJob";
import InfoFilterSidebar from "../components/InfoFilterBar";
import InformationList from "../components/viewer/InformationList";
import NewJobInfo from "../components/creater/NewJobInfo"; // <-- updated
import "./InfoCompany";

export default function InfoJob() {
  const { id } = useParams();
  const { info = [], loading, error, createInfo } = useJobInfos(id);

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filteredInfo =
    filter === "all"
      ? info
      : Array.isArray(info)
        ? info.filter((item) => item.infoType === filter)
        : [];

  const handleCreate = async (entityType, data) => {
    if (entityType === "job") {
      await createInfo(data); // your hook handles adding & updating state
    }
    // future: add job or other entity types here
  };

  return (
    <div className="info-container">
      {/* Main content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="page-title">Job Information</h1>
        </div>

        <InformationList
          info={filteredInfo}
          loading={loading}
          titleKey="titleJobInfo"
          error={error}
        />
      </div>

      <InfoFilterSidebar
        currentFilter={filter}
        onChange={setFilter}
        onAdd={() => setShowForm(true)}
      />


      {/* Add Job Information Form Modal */}
      {showForm && (
        <NewJobInfo
          jobId={id}
          onCreate={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
