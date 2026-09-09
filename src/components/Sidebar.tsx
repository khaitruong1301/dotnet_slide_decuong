import { NavLink, useLocation } from 'react-router-dom'
import { BUOI_LIST, COURSE, TOTAL_EXERCISES } from '../data'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()

  return (
    <nav className="flex h-full flex-col overflow-y-auto border-r border-ink/8 bg-panel/70 backdrop-blur">
      <div className="border-b border-ink/8 px-4 py-4">
        <NavLink to="/" onClick={onNavigate} className="block">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-black text-ink">
              C#
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-ink">{COURSE.title}</div>
              <div className="truncate text-[11px] text-ink/40">8 buổi · {TOTAL_EXERCISES} bài tập</div>
            </div>
          </div>
        </NavLink>
      </div>

      <div className="px-4 pb-1.5 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/30">Đề cương</div>

      <ul className="flex-1 space-y-1 px-3 pb-4">
        {BUOI_LIST.map((b) => {
          const active = pathname === `/buoi/${b.slug}`
          return (
            <li key={b.id}>
              <NavLink
                to={`/buoi/${b.slug}`}
                onClick={onNavigate}
                className={`group flex gap-3 rounded-xl px-2.5 py-2 transition ${
                  active ? 'bg-brand-500/15 ring-1 ring-brand-400/30' : 'hover:bg-ink/5'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                    active ? 'bg-brand-500 text-white' : 'bg-ink/8 text-ink/50 group-hover:text-ink/80'
                  }`}
                >
                  {b.id}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[13px] font-semibold leading-snug ${active ? 'text-ink' : 'text-ink/75'}`}>
                    {b.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-ink/35">
                    {b.sections.length} phần · {b.exercises.length} bài tập
                  </span>
                </span>
              </NavLink>

              {active && (
                <ul className="mb-1 ml-[2.35rem] mt-1 space-y-0.5 border-l border-ink/10 pl-3">
                  {b.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="block truncate py-1 text-[12px] text-ink/40 transition hover:text-brand-300">
                        {s.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#bai-tap" className="block py-1 text-[12px] font-medium text-ink/45 transition hover:text-brand-300">
                      Bài tập về nhà
                    </a>
                  </li>
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex items-center gap-2.5 border-t border-ink/8 px-4 py-3">
        <img
          src="/avatar.png"
          alt={COURSE.author}
          className="h-9 w-9 shrink-0 rounded-full border border-brand-400/35 object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-semibold text-ink/70">{COURSE.author}</div>
          <div className="text-[10.5px] text-ink/35">Biên soạn</div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
