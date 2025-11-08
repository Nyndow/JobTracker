import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./NewInfo.css";

export default function NewCompanyInfo({ companyId, onCreate, onClose }) {
  const [infoType, setInfoType] = useState("text");
  const [titleCompInfo, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [degree, setDegree] = useState(1);
  const [file, setFile] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Automatically set infoType based on file extension
    const ext = selectedFile.name.split(".").pop().toLowerCase();
    if (ext === "html") setInfoType("html");
    else if (ext === "pdf") setInfoType("pdf");
    else if (ext === "txt") setInfoType("text");
    else setInfoType("file"); // fallback for unknown extensions

    // Only allow assets for HTML files
    if (ext !== "html") setAssets([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        infoType,
        titleCompInfo,
        degree,
        value,
        idCompany: companyId,
        file: ["html", "pdf", "file"].includes(infoType) ? file : null,
        assets: infoType === "html" ? assets : [],
      };

      await onCreate("company", payload);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-info-container">
      <div className="new-info-box">
        <div className="close-icon-place">
          <XMarkIcon className="close-icon" onClick={onClose} />
        </div>
        <h2 className="new-info-title">Add Company Information</h2>

        <form onSubmit={handleSubmit} className="add-form-info">
          {/* Info Type */}
          <div>
            <label className="add-info-type">Type</label>
            <select
              value={["text", "note", "link"].includes(infoType) ? infoType : "file"}
              onChange={(e) => setInfoType(e.target.value)}
              className="select-infot-type"
            >
              <option value="text">text</option>
              <option value="note">note</option>
              <option value="link">link</option>
              <option value="file">file</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="add-form-title">Title</label>
            <input
              type="text"
              value={titleCompInfo}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* File Upload */}
          {infoType === "file" || ["html", "pdf"].includes(infoType) ? (
            <>
              <div>
                <label className="add-form-value">Upload File</label>
                <input
                  type="file"
                  accept=".html,.pdf,.txt,.docx"
                  onChange={handleFileChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              {infoType === "html" && (
                <div>
                  <label className="add-form-value">Upload Assets (optional)</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setAssets(Array.from(e.target.files))}
                    className="w-full border rounded p-2"
                  />
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="add-form-value">Content</label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="add-form-value-textarea"
                required
              />
            </div>
          )}

          {/* Degree */}
          <div>
            <label className="block font-medium mb-2">Degree</label>
            <div className="flex gap-4">
              {[1, 2, 3].map((d) => (
                <label key={d} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="degree"
                    value={d}
                    checked={degree === d}
                    onChange={() => setDegree(d)}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
