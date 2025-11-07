import { Document, Page, pdfjs } from 'react-pdf';
import samplePdf from '../data/cv.pdf';
import { useState, useEffect } from 'react';

// Set worker from CDN (works with Vite)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    fetch(samplePdf)
      .then((res) => res.blob())
      .then((blob) => setPdfUrl(URL.createObjectURL(blob)));
  }, []);

  if (!pdfUrl) return <div>Loading PDF...</div>;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}
