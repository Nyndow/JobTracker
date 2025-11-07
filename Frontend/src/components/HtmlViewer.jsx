import React from "react";
import "./HtmlViewer.css";

export default function HtmlViewerModal({ onClose, src }) {
  return (
    <div className="html-viewer-overlay">
      <div className="html-viewer-modal">
        {/* Header */}
        <div className="html-viewer-header">
          <h2 className="html-viewer-title">HTML Viewer</h2>
          <button onClick={onClose} className="html-viewer-close">
            ✕
          </button>
        </div>

        {/* Iframe Content */}
        <div className="html-viewer-content">
          <iframe src={src} title="Saved Page" />
        </div>
      </div>
    </div>
  );
}
