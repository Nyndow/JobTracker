import React, { useState } from "react";

export default function NewJobInfo({ jobId, onCreate, onClose }) {
  const [infoType, setInfoType] = useState("text");
  const [titleCompInfo, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [degree, setDegree] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { infoType, titleCompInfo, value, degree, idJob: jobId };
    console.log("Creating job info:", payload);

    try {
      await onCreate("job", payload);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Job Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info Type */}
          <div>
            <label className="block font-medium mb-1">Type</label>
            <select value={infoType} onChange={(e) => setInfoType(e.target.value)} className="w-full border rounded p-2">
              <option value="text">text</option>
              <option value="link">link</option>
              <option value="note">note</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input type="text" value={titleCompInfo} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2" />
          </div>

          {/* Value */}
          <div>
            <label className="block font-medium mb-1">Value</label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border rounded p-2 h-32 resize-y"
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


