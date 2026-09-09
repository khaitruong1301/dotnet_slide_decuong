import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const TOKEN = 'Cybersoft@123'
const KEY = 'decuong-unlocked'

/**
 * Cổng nhập token trước khi vào đề cương.
 *
 * Lưu ý: đây là lớp chặn phía trình duyệt, không phải bảo mật thật — token nằm
 * trong mã nguồn tải về máy người xem nên ai mở DevTools cũng đọc được. Dùng để
 * hạn chế người ngoài vào nhầm, không dùng để bảo vệ nội dung có giá trị.
 */
export default function TokenGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === TOKEN) setUnlocked(true)
    } catch {
      /* bỏ qua nếu trình duyệt chặn lưu trữ */
    }
    setReady(true)
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim() !== TOKEN) {
      setError(true)
      return
    }
    try {
      localStorage.setItem(KEY, TOKEN)
    } catch {
      /* không lưu được thì phiên sau phải nhập lại */
    }
    setUnlocked(true)
  }

  if (!ready) return null
  if (unlocked) return <>{children}</>

  return (
    <div className="bg-grid flex min-h-screen items-center justify-center px-6 py-12">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-7 flex flex-col items-center text-center">
          <img
            src="/avatar.png"
            alt="Trương Tấn Khải"
            className="h-20 w-20 rounded-full border-2 border-brand-400/40 object-cover shadow-lg shadow-brand-500/20"
          />
          <h1 className="mt-4 text-xl font-bold text-ink">Đề cương C# / ASP.NET Core</h1>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/45">
            Nhập token được cấp để mở nội dung khoá học.
          </p>
        </div>

        <form onSubmit={submit} className="card p-5">
          <label htmlFor="token" className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink/40">
            Token truy cập
          </label>
          <input
            id="token"
            type="password"
            autoFocus
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            placeholder="••••••••••••"
            className={`w-full rounded-lg border bg-ink/5 px-3.5 py-2.5 font-mono text-[14px] text-ink outline-none transition placeholder:text-ink/25 focus:border-brand-400 ${
              error ? 'border-rose-400/70' : 'border-ink/12'
            }`}
          />

          {error && <p className="mt-2 text-[13px] text-rose-400">Token không đúng. Kiểm tra lại giúp mình nhé.</p>}

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-[14px] font-semibold text-white transition hover:brightness-110"
          >
            Vào học
          </button>
        </form>

        <p className="mt-5 text-center text-[12px] text-ink/30">Biên soạn: Trương Tấn Khải</p>
      </div>
    </div>
  )
}
