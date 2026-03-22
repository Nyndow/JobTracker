import React, { Suspense, useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Loading from "./components/ui/Loading";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main
        className={`transition-all duration-300 p-4 overflow-auto bg-gray-50 dark:bg-gray-900 ${
          isSidebarExpanded
            ? "ml-64 w-[calc(100vw-16rem)]"
            : "ml-20 w-[calc(100vw-5rem)]"
        }`}
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
