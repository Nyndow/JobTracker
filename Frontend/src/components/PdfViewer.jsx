import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./HtmlViewer.css"; // reuse the same modal styles

// Configure worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewerModal({ onClose, src }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function zoomIn() {
    setScale((prev) => Math.min(prev + 0.2, 3));
  }

  function zoomOut() {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  }

  function resetZoom() {
    setScale(1);
  }

  return (
    <div className="html-viewer-overlay">
      <div className="html-viewer-modal flex flex-col">
        {/* Header */}
        <div className="html-viewer-header">
          <h2 className="html-viewer-title">PDF Viewer</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="px-2 py-1 border rounded hover:bg-gray-200"
              title="Zoom out"
            >
              -
            </button>
            <button
              onClick={resetZoom}
              className="px-2 py-1 border rounded hover:bg-gray-200"
              title="Reset zoom"
            >
              Reset
            </button>
            <button
              onClick={zoomIn}
              className="px-2 py-1 border rounded hover:bg-gray-200"
              title="Zoom in"
            >
              +
            </button>
            <button
              onClick={onClose}
              className="html-viewer-close ml-3"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div
          className="html-viewer-content flex-1 bg-gray-50 p-2"
          style={{ overflow: "auto" }}
        >
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p>Loading PDF...</p>}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-2 shadow-md"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
