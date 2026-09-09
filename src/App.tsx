import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import BuoiPage from './pages/BuoiPage'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-grid min-h-screen">
      {/* Thanh trên — chỉ hiện ở màn hình nhỏ để mở menu */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/8 bg-ink-950/85 px-4 py-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở đề cương"
          className="rounded-lg border border-white/12 px-3 py-1.5 text-white/70"
        >
          ☰
        </button>
        <span className="text-sm font-semibold text-white/70">Đề cương C# .NET</span>
      </div>

      <div className="lg:flex">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
          <Sidebar />
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72">
              <Sidebar onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 lg:ml-72">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buoi/:slug" element={<BuoiPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
