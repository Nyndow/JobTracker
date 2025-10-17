import { useState } from "react";
import {
  XMarkIcon
} from "@heroicons/react/24/outline";
import "./NewInfo.css"

export default function NewCompanyInfo({ companyId, onCreate, onClose }) {
  const [infoType, setInfoType] = useState("text");
  const [titleCompInfo, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [degree, setDegree] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { infoType, titleCompInfo, value, degree, idCompany: companyId };
    console.log("Creating company info:", payload);

    try {
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
        <div className="close-icon-place" ><XMarkIcon className="close-icon" onClick={onClose} /></div>
        <h2 className="new-info-title">Add Company Information</h2>

        <form onSubmit={handleSubmit} className="add-form-info">
          {/* Info Type */}
          <div>
            <label className="add-info-type">Type</label>
            <select value={infoType} onChange={(e) => setInfoType(e.target.value)} className="select-infot-type">
              <option value="text">text</option>
              <option value="link">link</option>
              <option value="note">note</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="add-form-title">Title</label>
            <input type="text" value={titleCompInfo} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2" />
          </div>

          {/* Value */}
          <div>
            <label className="add-form-value">Content</label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="add-form-value-textarea"
              required
            />
          </div>


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


          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}


