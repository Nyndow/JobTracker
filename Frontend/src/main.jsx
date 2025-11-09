import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Test from './pages/Test'
import CompanyPage from './pages/Company'
import InfoCompany from './pages/InfoCompany'
import PdfViewer from './components/viewer/PdfViewer' // <-- import your new PDF viewer
import './index.css'
import InfoJob from './pages/InfoJob'
import HtmlViewer from './components/viewer/HtmlViewer' // <-- import your new HTML viewer

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home route, no Sidebar */}
        <Route path="/" element={<Home />} />

        {/* All other routes inside App (with Sidebar) */}
        <Route path="/app" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="test" element={<Test />} />
          <Route path="company/:id" element={<CompanyPage />} />
          <Route path="company/:id/info" element={<InfoCompany />} />
          <Route path="jobs/:id" element={<InfoJob />} />

          {/* PDF Viewer route */}
          <Route path="pdf" element={<PdfViewer />} />
          <Route path="html" element={<HtmlViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
