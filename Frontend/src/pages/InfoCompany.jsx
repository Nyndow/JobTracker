import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompanyInfos } from "../hooks/useCompany";
import { useCreateCompanyInfoHTML } from "../hooks/useCompany"; // ✅ import it
import InfoFilterSidebar from "../components/InfoFilterBar";
import InformationList from "../components/InformationList";
import NewCompanyInfo from "../components/NewCompanyInfo";
import "./InfoCompany.css";

export default function InfoCompany() {
  const { id } = useParams();

  const { info = [], loading, error, createInfo, reload } = useCompanyInfos(id);
  const { createCompanyInfoHTML } = useCreateCompanyInfoHTML();
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [localInfo, setLocalInfo] = useState(info); // ✅ local mirror to display instantly

  // Sync when hook data changes
  React.useEffect(() => {
    setLocalInfo(info);
  }, [info]);

  const filteredInfo =
    filter === "all"
      ? localInfo
      : Array.isArray(localInfo)
        ? localInfo.filter((item) => item.infoType === filter)
        : [];

const handleCreate = async (entityType, data) => {
  if (entityType !== "company") return;
  try {
    if (data.infoType === "file" || data.infoType === "html") {
      console.log("Creating HTML info...");
      await createCompanyInfoHTML(id, data);
      console.log("Reloading infos...");
      await reload(); // ✅ refetch
      console.log("Reload complete!");
    } else {
      const created = await createInfo(data);
      setLocalInfo((prev) => [...prev, created]);
    }
  } catch (err) {
    console.error("Error creating info:", err);
  }
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
