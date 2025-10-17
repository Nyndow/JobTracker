import React, { useState } from "react";
import { useCreateCompany } from "../hooks/useCompany";

export default function NewCompany({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const { create } = useCreateCompany();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await create({ name, aboutCompany });
      onCreated?.(); // notify parent to reload company list
      onClose();     // close modal
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add New Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="e.g., TechNova Ltd"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              className="w-full border rounded p-2 h-24 resize-y"
              placeholder="Short description of the company"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
