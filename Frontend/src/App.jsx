import React, { Suspense, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Loading from './components/ui/Loading'

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <main
        className={` transition-all duration-300 p-4 ${isSidebarExpanded ? 'ml-64' : 'ml-20'
          }`}
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>

  )
}

export default App
