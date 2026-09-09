import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BUOI_LIST, findBuoi } from '../data'
import type { Block, Exercise } from '../data/types'
import CodeBlock from '../components/CodeBlock'
import Visual from '../components/Visual'

const CALLOUT = {
  info: { ring: 'border-accent-400/35 bg-accent-400/8', dot: 'text-accent-400', label: 'Ghi nhớ' },
  warn: { ring: 'border-amber-400/35 bg-amber-400/8', dot: 'text-amber-300', label: 'Cẩn thận' },
  tip: { ring: 'border-mint-400/35 bg-mint-400/8', dot: 'text-mint-400', label: 'Mẹo' },
}

const LEVELS = ['Cơ bản', 'Trung bình', 'Nâng cao'] as const

const LEVEL = {
  'Cơ bản': 'bg-mint-400/15 text-mint-400',
  'Trung bình': 'bg-amber-400/15 text-amber-300',
  'Nâng cao': 'bg-rose-400/15 text-rose-300',
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return <p className="text-[15px] leading-[1.8] text-ink/65">{block.text}</p>

    case 'list':
      return block.ordered ? (
        <ol className="space-y-2.5">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-ink/65">
              <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-500/15 font-mono text-[11px] text-brand-300">
                {i + 1}
              </span>
              <span className="leading-[1.75]">{t}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2.5">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-ink/65">
              <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span className="leading-[1.75]">{t}</span>
            </li>
          ))}
        </ul>
      )

    case 'code':
      return <CodeBlock sample={block.sample} />

    case 'visual':
      return (
        <figure className="card px-4 py-6 text-[15px]">
          <Visual v={block.visual} />
        </figure>
      )

    case 'callout': {
      const c = CALLOUT[block.tone]
      return (
        <aside className={`rounded-xl border px-4 py-3.5 ${c.ring}`}>
          <div className={`mb-1 text-[11px] font-bold uppercase tracking-widest ${c.dot}`}>{block.title ?? c.label}</div>
          <p className="text-[14.5px] leading-[1.75] text-ink/70">{block.text}</p>
        </aside>
      )
    }

    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-ink/10">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-ink/6 text-ink/55">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="whitespace-nowrap px-4 py-2.5 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {block.rows.map((r, i) => (
                <tr key={i} className="align-top">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'whitespace-nowrap font-mono text-accent-400' : 'text-ink/70'}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

function ExerciseCard({ ex, index }: { ex: Exercise; index: number }) {
  const [done, setDone] = useState(false)
  return (
    <li className={`card p-4 transition ${done ? 'opacity-55' : ''}`}>
      <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setDone((d) => !d)}
          aria-pressed={done}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold transition ${
            done ? 'bg-mint-400/25 text-mint-400' : 'bg-ink/8 text-ink/50 hover:bg-ink/15'
          }`}
          title={done ? 'Bỏ đánh dấu' : 'Đánh dấu đã làm'}
        >
          {done ? '✓' : index + 1}
        </button>
        <h4 className={`text-[15px] font-bold text-ink ${done ? 'line-through' : ''}`}>{ex.title}</h4>
        <span className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${LEVEL[ex.level]}`}>{ex.level}</span>
      </div>

      <p className="text-[14.5px] leading-[1.75] text-ink/60">{ex.requirement}</p>

      {ex.io && (
        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-accent-400/25 bg-accent-400/6 px-3 py-2">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-accent-400">Input</div>
            <pre className="whitespace-pre-wrap font-mono text-[12.5px] text-ink/75">{ex.io.input}</pre>
          </div>
          <div className="rounded-lg border border-mint-400/25 bg-mint-400/6 px-3 py-2">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-mint-400">Output</div>
            <pre className="whitespace-pre-wrap font-mono text-[12.5px] text-ink/75">{ex.io.output}</pre>
          </div>
        </div>
      )}

      {ex.hint && <p className="mt-3 text-[13.5px] text-amber-300/75">Gợi ý: {ex.hint}</p>}
    </li>
  )
}

/** Mục lục nổi bên phải — bám theo phần đang đọc. */
function OnThisPage({ items, onPick }: { items: { id: string; title: string }[]; onPick: (id: string) => void }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    items.forEach((i) => {
      const el = document.getElementById(i.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [items])

  return (
    <nav className="no-print sticky top-8 hidden w-56 shrink-0 self-start xl:block">
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/30">Trên trang này</div>
      <ul className="space-y-1 border-l border-ink/10">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={() => onPick(i.id)}
              className={`-ml-px block border-l-2 py-1 pl-3.5 text-[12.5px] leading-snug transition ${
                active === i.id ? 'border-brand-400 text-brand-300' : 'border-transparent text-ink/40 hover:text-ink/70'
              }`}
            >
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function BuoiPage() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const buoi = findBuoi(slug)
  const [tab, setTab] = useState<'ly-thuyet' | 'bai-tap'>('ly-thuyet')
  const [level, setLevel] = useState<string>('')

  const levelsCo = LEVELS.filter((lv) => buoi?.exercises.some((e) => e.level === lv))

  useEffect(() => {
    setTab('ly-thuyet')
    setLevel(levelsCo[0] ?? 'Tất cả')
    if (!window.location.hash) window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  /* Link có hash (menu trái, mục lục phải) phải mở đúng tab rồi mới cuộn tới. */
  useEffect(() => {
    const id = hash.replace('#', '')
    if (!id) return
    if (id === 'bai-tap') setTab('bai-tap')
    else if (buoi?.sections.some((sec) => sec.id === id)) setTab('ly-thuyet')
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, slug])

  if (!buoi) {
    return (
      <div className="px-8 py-20 text-center text-ink/50">
        Không tìm thấy buổi học này. <Link to="/" className="text-brand-300 underline">Về trang chủ</Link>
      </div>
    )
  }

  const prev = BUOI_LIST.find((b) => b.id === buoi.id - 1)
  const next = BUOI_LIST.find((b) => b.id === buoi.id + 1)
  const toc = buoi.sections.map((s) => ({ id: s.id, title: s.title }))

  /** Mục lục bấm vào phần lý thuyết thì kéo tab về đúng chỗ trước khi cuộn. */
  function pickToc() {
    setTab('ly-thuyet')
  }

  /**
   * Đặt cờ data-print trên <html> để CSS biết in đầy đủ hay chỉ in tab đang xem,
   * rồi gỡ cờ ra sau khi hộp thoại in đóng lại.
   */
  function printAs(mode: 'full' | 'tab') {
    const root = document.documentElement
    root.dataset.print = mode
    const cleanup = () => {
      delete root.dataset.print
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)
    window.print()
    setTimeout(cleanup, 1000)
  }

  function goTab(t: 'ly-thuyet' | 'bai-tap') {
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tabBtn = (on: boolean) =>
    `rounded-lg px-4 py-2 text-[13.5px] font-semibold transition ${
      on ? 'bg-brand-500/18 text-brand-300 ring-1 ring-brand-400/35' : 'text-ink/50 hover:bg-ink/6 hover:text-ink/80'
    }`

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-5 py-7 sm:px-8">
      <article className="min-w-0 flex-1">
        <header className="mb-6 border-b border-ink/8 pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2.5 text-[11px] uppercase tracking-[0.16em]">
            <span className="rounded-full bg-brand-500/15 px-3 py-1 font-bold text-brand-300">Buổi {buoi.id}</span>
            <span className="text-ink/30">{buoi.duration}</span>
            <span className="text-ink/30">· {buoi.exercises.length} bài tập</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">{buoi.title}</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink/55">{buoi.subtitle}</p>

          <div className="no-print mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => printAs('full')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:brightness-110"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
              Tải PDF đầy đủ
            </button>

            <button
              onClick={() => printAs('tab')}
              className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/8 hover:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
              </svg>
              Tải PDF tab đang xem
            </button>

            <span className="text-[12.5px] text-ink/35">
              {tab === 'ly-thuyet'
                ? 'Đang xem: Lý thuyết'
                : `Đang xem: Bài tập${level === 'Tất cả' ? '' : ` — ${level}`}`}
            </span>
          </div>

          <div className="print-full-only mt-5 rounded-xl border border-ink/10 bg-ink/4 p-4">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-ink/40">Sau buổi này bạn sẽ</div>
            <ul className="space-y-1.5">
              {buoi.goals.map((g, i) => (
                <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink/70">
                  <span className="mt-0.5 text-mint-400">✓</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Tab cấp trang — ẩn khi in để bản PDF liền mạch */}
        <div className="no-print sticky top-0 z-20 -mx-1 mb-6 flex gap-1.5 bg-page/85 px-1 py-2 backdrop-blur">
          <button onClick={() => goTab('ly-thuyet')} className={tabBtn(tab === 'ly-thuyet')}>
            Lý thuyết
            <span className="ml-1.5 text-[11.5px] font-normal opacity-60">{buoi.sections.length}</span>
          </button>
          <button onClick={() => goTab('bai-tap')} className={tabBtn(tab === 'bai-tap')}>
            Bài tập
            <span className="ml-1.5 text-[11.5px] font-normal opacity-60">{buoi.exercises.length}</span>
          </button>
        </div>

        {/* Lý thuyết */}
        <div data-panel data-open={String(tab === 'ly-thuyet')}>
          {buoi.sections.map((s) => (
            <section key={s.id} id={s.id} className="print-page mb-10 scroll-mt-16">
              <h2 className="group mb-4 flex items-baseline gap-2 text-[22px] font-bold text-ink">
                {s.title}
                <a href={`#${s.id}`} className="no-print text-[15px] text-brand-400/0 transition group-hover:text-brand-400/70" aria-label="Liên kết tới mục này">
                  #
                </a>
              </h2>
              <div className="space-y-4">
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bài tập */}
        <div data-panel data-open={String(tab === 'bai-tap')}>
          <section id="bai-tap" className="print-page scroll-mt-16">
            <h2 className="mb-1.5 text-[22px] font-bold text-ink">Bài tập về nhà</h2>
            <p className="no-print mb-4 text-[14.5px] text-ink/45">
              {buoi.exercises.length} bài — chọn cấp độ bên dưới. Bấm vào số thứ tự để đánh dấu đã làm xong.
            </p>

            {/* Tab cấp độ */}
            <div className="no-print mb-5 flex flex-wrap gap-1.5">
              {[...levelsCo, 'Tất cả'].map((lv) => {
                const n = lv === 'Tất cả' ? buoi.exercises.length : buoi.exercises.filter((e) => e.level === lv).length
                const on = level === lv
                return (
                  <button
                    key={lv}
                    onClick={() => setLevel(lv)}
                    className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition ${
                      on ? 'border-brand-400/40 bg-brand-500/15 text-brand-300' : 'border-ink/10 text-ink/50 hover:bg-ink/6 hover:text-ink/80'
                    }`}
                  >
                    {lv}
                    <span className="ml-1.5 text-[11px] font-normal opacity-60">{n}</span>
                  </button>
                )
              })}
            </div>

            {levelsCo.map((lv) => {
              const list = buoi.exercises.filter((e) => e.level === lv)
              return (
                <div key={lv} data-panel data-open={String(level === lv || level === 'Tất cả')} className="mb-7">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${LEVEL[lv]}`}>{lv}</span>
                    <span className="text-[12px] text-ink/35">{list.length} bài</span>
                    <span className="h-px flex-1 bg-ink/8" />
                  </div>
                  <ul className="space-y-3">
                    {list.map((ex, i) => (
                      <ExerciseCard key={ex.id} ex={ex} index={i} />
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>
        </div>

        <nav className="no-print mt-10 flex gap-3 border-t border-ink/8 pt-6">
          {prev && (
            <Link to={`/buoi/${prev.slug}`} className="card flex-1 p-4 transition hover:border-brand-400/40">
              <div className="text-[11px] uppercase tracking-widest text-ink/30">← Buổi {prev.id}</div>
              <div className="mt-1 text-[14px] font-semibold text-ink/80">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link to={`/buoi/${next.slug}`} className="card flex-1 p-4 text-right transition hover:border-brand-400/40">
              <div className="text-[11px] uppercase tracking-widest text-ink/30">Buổi {next.id} →</div>
              <div className="mt-1 text-[14px] font-semibold text-ink/80">{next.title}</div>
            </Link>
          )}
        </nav>
      </article>

      <OnThisPage items={toc} onPick={pickToc} />
    </div>
  )
}
