import { useState } from "react";
import "./ExpandableText.css";

export default function ExpandableText({ text, maxLength = 200 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxLength) {
    return <span className="expandable-text">{text}</span>;
  }

  return (
    <div className="expandable-container">
      <span className="expandable-text">
        {expanded ? text : text.slice(0, maxLength) + "…"}
      </span>
      <button
        onClick={() => setExpanded(!expanded)}
        className="expandable-toggle"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
