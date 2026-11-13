import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BUOI_LIST } from '../data'
import { findInterviewSet, INTERVIEW_SETS } from '../data/phongvan'
import type { InterviewQuestion } from '../data/types'
import { BlockView } from './BuoiPage'

const LEVELS = ['Cơ bản', 'Trung bình', 'Nâng cao'] as const

const LEVEL_TONE = {
  'Cơ bản': 'bg-mint-400/15 text-mint-400',
  'Trung bình': 'bg-amber-400/15 text-amber-300',
  'Nâng cao': 'bg-rose-400/15 text-rose-300',
}

/** Một thẻ câu hỏi: mặc định chỉ hiện số và câu hỏi, bấm vào mới xổ đáp án. */
function QuestionCard({ q, index, open, onToggle }: { q: InterviewQuestion; index: number; open: boolean; onToggle: () => void }) {
  return (
    <li className="card overflow-hidden" data-qa>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition hover:bg-ink/4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 font-mono text-[12px] font-bold text-brand-300">
          {index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{q.question}</span>
          <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${LEVEL_TONE[q.level]}`}>{q.level}</span>
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className={`no-print mt-1 shrink-0 text-ink/35 transition ${open ? 'rotate-180' : ''}`} aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div data-qa-body data-open={String(open)} className="space-y-4 border-t border-ink/8 px-4 pb-5 pt-4">
        <div className="rounded-xl border border-mint-400/35 bg-mint-400/8 px-4 py-3">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-mint-400">Trả lời ngắn</div>
          <p className="text-[14.5px] leading-[1.75] text-ink/80">{q.short}</p>
        </div>

        {q.answer.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}

        {q.followUps && q.followUps.length > 0 && (
          <div className="rounded-xl border border-accent-400/30 bg-accent-400/6 px-4 py-3">
            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-400">Nhà tuyển dụng có thể hỏi tiếp</div>
            <ul className="space-y-1">
              {q.followUps.map((f, i) => (
                <li key={i} className="flex gap-2 text-[14px] text-ink/70">
                  <span className="text-accent-400">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {q.buoi && q.buoi.length > 0 && (
          <div className="no-print flex flex-wrap items-center gap-2 text-[12.5px] text-ink/45">
            Ôn lại:
            {q.buoi.map((n) => {
              const b = BUOI_LIST.find((x) => x.id === n)
              return b ? (
                <Link key={n} to={`/buoi/${b.slug}`} className="rounded-md bg-ink/6 px-2 py-0.5 text-ink/65 transition hover:bg-brand-500/15 hover:text-brand-300">
                  Buổi {n} · {b.title}
                </Link>
              ) : null
            })}
          </div>
        )}
      </div>
    </li>
  )
}

export default function PhongVanPage() {
  const { slug } = useParams()
  const set = findInterviewSet(slug)
  const [level, setLevel] = useState<string>('Tất cả')
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  // Chế độ luyện tập: chỉ hiện vài câu bốc ngẫu nhiên
  const [luyenTap, setLuyenTap] = useState<string[] | null>(null)

  const list = useMemo(() => {
    if (!set) return []
    let qs = set.questions
    if (luyenTap) qs = qs.filter((q) => luyenTap.includes(q.id))
    if (level !== 'Tất cả') qs = qs.filter((q) => q.level === level)
    return qs
  }, [set, level, luyenTap])

  if (!set) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-ink/60">Không có bộ câu hỏi này.</p>
        <Link to="/" className="mt-4 inline-block text-brand-300">← Về trang chủ</Link>
      </div>
    )
  }

  const dem = (lv: string) => set.questions.filter((q) => q.level === lv).length
  const toggle = (id: string) =>
    setOpenIds((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  const moHet = () => setOpenIds(new Set(list.map((q) => q.id)))
  const thuGon = () => setOpenIds(new Set())

  function bocCau() {
    const tron = [...set!.questions].sort(() => Math.random() - 0.5)
    // Lấy cân bằng: 1 cơ bản, 2 trung bình, 2 nâng cao nếu có
    const lay = (lv: string, k: number) => tron.filter((q) => q.level === lv).slice(0, k)
    const chon = [...lay('Cơ bản', 1), ...lay('Trung bình', 2), ...lay('Nâng cao', 2)]
    setLuyenTap(chon.map((q) => q.id))
    setLevel('Tất cả')
    setOpenIds(new Set())
  }

  function inPdf() {
    const root = document.documentElement
    root.dataset.print = 'qa'
    const cleanup = () => {
      delete root.dataset.print
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)
    window.print()
    setTimeout(cleanup, 1000)
  }

  const idx = INTERVIEW_SETS.findIndex((s) => s.slug === set.slug)
  const truoc = INTERVIEW_SETS[idx - 1]
  const sau = INTERVIEW_SETS[idx + 1]
  const btn = (on: boolean) =>
    `rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition ${
      on ? 'bg-brand-500/18 text-brand-300 ring-1 ring-brand-400/35' : 'text-ink/50 hover:bg-ink/6 hover:text-ink/80'
    }`

  return (
    <div className="mx-auto max-w-4xl px-5 py-7 sm:px-8">
      <header className="mb-6">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
          Câu hỏi phỏng vấn · buổi {set.from}–{set.to}
        </div>
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">{set.title}</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/55">{set.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
          <span className="rounded-md bg-ink/6 px-2.5 py-1 text-ink/60">{set.questions.length} câu</span>
          {LEVELS.map((lv) => (
            <span key={lv} className={`rounded-md px-2.5 py-1 font-semibold ${LEVEL_TONE[lv]}`}>
              {dem(lv)} {lv}
            </span>
          ))}
        </div>
      </header>

      <div className="no-print sticky top-0 z-20 -mx-1 mb-5 flex flex-wrap items-center gap-1.5 bg-page/85 px-1 py-2 backdrop-blur">
        {['Tất cả', ...LEVELS].map((lv) => (
          <button key={lv} onClick={() => setLevel(lv)} className={btn(level === lv)}>
            {lv}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-ink/12" />
        <button onClick={moHet} className={btn(false)}>Mở hết đáp án</button>
        <button onClick={thuGon} className={btn(false)}>Thu gọn</button>
        <span className="ml-auto" />
        {luyenTap ? (
          <button onClick={() => setLuyenTap(null)} className="rounded-lg border border-ink/12 px-3 py-1.5 text-[12.5px] text-ink/60 hover:bg-ink/6">
            Thoát luyện tập
          </button>
        ) : (
          <button onClick={bocCau} className="rounded-lg border border-brand-400/40 px-3 py-1.5 text-[12.5px] font-semibold text-brand-300 hover:bg-brand-500/10">
            Luyện phỏng vấn 5 câu
          </button>
        )}
        <button
          onClick={inPdf}
          className="rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:brightness-110"
        >
          Tải PDF có đáp án
        </button>
      </div>

      {luyenTap && (
        <div className="no-print mb-4 rounded-xl border border-brand-400/35 bg-brand-500/8 px-4 py-3 text-[14px] text-ink/70">
          Chế độ luyện tập: tự trả lời thành tiếng từng câu trước, rồi mới bấm để xem đáp án. Bấm lại nút để bốc bộ khác.
        </div>
      )}

      {set.questions.length === 0 ? (
        <div className="card px-4 py-8 text-center text-ink/50">Bộ câu hỏi đang được soạn.</div>
      ) : (
        <ol className="space-y-3">
          {list.map((q) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={set.questions.indexOf(q) + 1}
              open={openIds.has(q.id)}
              onToggle={() => toggle(q.id)}
            />
          ))}
        </ol>
      )}

      <nav className="no-print mt-10 flex justify-between gap-4 border-t border-ink/8 pt-5 text-[13.5px]">
        {truoc ? <Link to={`/phong-van/${truoc.slug}`} className="text-ink/55 hover:text-brand-300">← {truoc.title}</Link> : <span />}
        {sau ? <Link to={`/phong-van/${sau.slug}`} className="text-right text-ink/55 hover:text-brand-300">{sau.title} →</Link> : <span />}
      </nav>
    </div>
  )
}
