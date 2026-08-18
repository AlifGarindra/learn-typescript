import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { kursusDariPathname } from './data/courses';
import { LessonPage } from './pages/LessonPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isPlayground = location.pathname.startsWith('/playground');
  const kursusAktif = kursusDariPathname(location.pathname);

  return (
    <div className="flex h-svh overflow-hidden">
      {/* Sidebar — hidden di playground desktop */}
      {!isPlayground && (
        <div className="hidden md:flex flex-col w-72 lg:w-80 flex-shrink-0 overflow-hidden">
          <Sidebar />
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[85vw] flex flex-col overflow-hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Mobile header — sembunyikan di playground */}
        {!isPlayground && (
          <div className="sticky top-0 z-10 md:hidden flex items-center gap-3 px-4 py-3 bg-[#0f1117]/90 backdrop-blur-md border-b border-white/8 flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/8 text-gray-400 hover:text-white transition-colors"
              aria-label="Buka menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-white font-semibold text-sm">{kursusAktif.judul}</span>
          </div>
        )}

        <div className={isPlayground ? 'flex-1 overflow-hidden' : 'flex-1 overflow-y-auto'}>
          <Routes>
            <Route path="/topik/:topikId" element={<LessonPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/playground/:topikId" element={<PlaygroundPage />} />
            <Route path="*" element={<Navigate to="/topik/00-01" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
