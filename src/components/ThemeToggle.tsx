import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function current(): Theme {
  return (document.documentElement.dataset.theme as Theme) ?? 'dark'
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* trình duyệt chặn lưu trữ — vẫn đổi được theme trong phiên hiện tại */
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      onClick={() => setTheme(next)}
      title={next === 'light' ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
      aria-label={next === 'light' ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}
      className={`flex items-center justify-center rounded-lg border border-ink/12 text-ink/60 transition hover:bg-ink/8 hover:text-ink ${
        compact ? 'h-8 w-8' : 'h-8 w-8'
      }`}
    >
      {theme === 'dark' ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
