import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Test from './pages/Test'
import CompanyPage from './pages/Company'
import InfoCompany from './pages/InfoCompany'
import './index.css'
import InfoJob from './pages/InfoJob'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home route, no Sidebar */}
        <Route path="/" element={<Home />} />

        {/* All other routes inside App (with Sidebar) */}
        <Route path="/app" element={<App />}>
          <Route path="test" element={<Test />} />
          <Route path="company/:id" element={<CompanyPage />} />
          <Route path="company/:id/info" element={<InfoCompany />} />
          <Route path="jobs/:id" element={<InfoJob />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
