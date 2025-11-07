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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload;

      if (infoType === "file") {
        if (!file) throw new Error("File is required");

        const isHTML = file.name.toLowerCase().endsWith(".html");
        payload = {
          infoType: isHTML ? "html" : "file",
          titleCompInfo,
          degree,
          file,
          assets: isHTML ? assets : [],
          value,
          idCompany: companyId,
        };
      } else {
        payload = { infoType, titleCompInfo, value, degree, idCompany: companyId };
      }

      await onCreate("company", payload); // ✅ delegate creation to parent
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (!selectedFile?.name.toLowerCase().endsWith(".html")) setAssets([]);
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
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
              className="select-infot-type"
            >
              <option value="text">text</option>
              <option value="link">link</option>
              <option value="note">note</option>
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

          {/* Value / File */}
          {infoType === "file" ? (
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

              {file && file.name.toLowerCase().endsWith(".html") && (
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
