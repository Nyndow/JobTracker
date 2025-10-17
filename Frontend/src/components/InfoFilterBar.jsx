import React from "react";
import "./InfoFilterBar.css";
import {
  RectangleStackIcon,
  LinkIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export default function InfoFilterSidebar({ currentFilter, onChange, onAdd }) {
  const types = [
    { id: "all", icon: <RectangleStackIcon /> },
    { id: "link", icon: <LinkIcon /> },
    { id: "text", icon: <DocumentTextIcon /> },
    { id: "note", icon: <PencilSquareIcon /> },
  ];

  return (
    <div className="info-sidebar flex flex-col items-center p-2">
      {/* Add button */}
      <button
        className="info-btn default mt-4"
        onClick={onAdd}
        title="Add Information"
      >
        <PlusIcon />
      </button>
      {types.map(({ id, icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`info-btn ${currentFilter === id ? "active" : "default"} mb-2`}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
