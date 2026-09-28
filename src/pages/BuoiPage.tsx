import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BUOI_LIST, findBuoi } from '../data'
import type { Block, Exercise, TabItem } from '../data/types'
import CodeBlock from '../components/CodeBlock'
import CodeRunner from '../components/CodeRunner'
import Visual from '../components/Visual'
import ExerciseSlide from '../components/ExerciseSlide'
import ConsoleDemo from '../components/ConsoleDemo'

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

/** Khối chia tab: nút chọn ở trên (không in), mỗi panel giữ trong DOM để bản in đầy đủ mở hết. */
function TabsBlock({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="rounded-2xl border border-ink/10 bg-panel/40">
      <div className="no-print flex flex-wrap gap-1.5 border-b border-ink/8 px-3 py-2.5">
        {items.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
              i === active ? 'bg-brand-500/18 text-brand-300 ring-1 ring-brand-400/35' : 'text-ink/50 hover:bg-ink/6 hover:text-ink/80'
            }`}
          >
            <span className="mr-1.5 font-mono text-[11px] opacity-60">{i + 1}</span>
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t, i) => (
        <div key={i} data-panel data-open={String(i === active)} className="space-y-4 px-4 py-5 sm:px-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[17px] font-bold text-ink">
              <span className="mr-2 font-mono text-[13px] text-brand-400">{i + 1}.</span>
              {t.label}
            </h3>
            {t.hint && <code className="font-mono text-[12.5px] text-accent-400">{t.hint}</code>}
          </div>
          {t.blocks.map((b, j) => (
            <BlockView key={j} block={b} />
          ))}
        </div>
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'tabs':
      return <TabsBlock items={block.items} />

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
      // Có trace thì hiện dạng hai cột chạy từng dòng, không thì vẫn là khối code thường
      return block.sample.trace ? <CodeRunner sample={block.sample} /> : <CodeBlock sample={block.sample} />

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

function ExerciseCard({
  ex,
  index,
  picked,
  onPick,
}: {
  ex: Exercise
  index: number
  picked: boolean
  onPick: () => void
}) {
  const [done, setDone] = useState(false)
  // Mặc định thu gọn: chỉ hiện số và tên bài, bấm vào tên mới xổ nội dung
  const [open, setOpen] = useState(false)
  return (
    <li data-ex className={`card p-4 transition ${done ? 'opacity-55' : ''} ${picked ? 'ring-1 ring-brand-400/45' : ''}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="no-print flex cursor-pointer items-center" title="Chọn bài này để xuất PDF">
          <input
            type="checkbox"
            checked={picked}
            onChange={onPick}
            className="h-4 w-4 shrink-0 cursor-pointer accent-[var(--brand-500)]"
          />
        </label>
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
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
        >
          <h4 className={`text-[15px] font-bold text-ink ${done ? 'line-through' : ''}`}>{ex.title}</h4>
          <span className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${LEVEL[ex.level]}`}>{ex.level}</span>
          {ex.guide && ex.guide.length > 0 && (
            <span className="no-print rounded-md bg-accent-400/12 px-2 py-0.5 text-[10.5px] font-semibold text-accent-400">
              {ex.guide.length} tab hướng dẫn
            </span>
          )}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            className={`no-print ml-auto shrink-0 text-ink/35 transition ${open ? 'rotate-180' : ''}`} aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div data-ex-body data-open={String(open)} className="mt-2.5">
      <p className="text-[14.5px] leading-[1.75] text-ink/60">{ex.requirement}</p>

      {ex.signature && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-ink/10 bg-ink/5 px-3 py-2 font-mono text-[12.5px] text-accent-400">
          {ex.signature}
        </pre>
      )}

      {ex.examples?.map((tc, i) => (
        <div key={i} className="mt-3 rounded-lg border border-ink/10 bg-ink/4 px-3.5 py-2.5">
          <div className="mb-1.5 text-[10.5px] font-bold uppercase tracking-widest text-ink/40">
            Ví dụ {ex.examples!.length > 1 ? i + 1 : ''}
          </div>
          <dl className="space-y-1 font-mono text-[12.5px]">
            <div className="flex gap-2">
              <dt className="shrink-0 text-accent-400">Input:</dt>
              <dd className="whitespace-pre-wrap text-ink/80">{tc.input}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 text-mint-400">Output:</dt>
              <dd className="whitespace-pre-wrap text-ink/80">{tc.output}</dd>
            </div>
          </dl>
          {tc.explain && (
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/50">
              <span className="font-semibold text-ink/65">Giải thích: </span>
              {tc.explain}
            </p>
          )}
        </div>
      ))}

      {ex.constraints && ex.constraints.length > 0 && (
        <div className="mt-3">
          <div className="mb-1 text-[10.5px] font-bold uppercase tracking-widest text-ink/40">Ràng buộc</div>
          <ul className="space-y-0.5">
            {ex.constraints.map((c, i) => (
              <li key={i} className="flex gap-2 font-mono text-[12.5px] text-ink/55">
                <span className="text-ink/25">·</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ex.hint && <p className="mt-3 text-[13.5px] text-amber-300/75">Gợi ý: {ex.hint}</p>}

      {ex.demo && (
        <div className="no-print mt-4">
          <div className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-ink/40">
            Chạy thử chương trình mẫu <span className="normal-case tracking-normal text-ink/35">— gõ số chọn menu rồi Enter, giống console thật</span>
          </div>
          <ConsoleDemo id={ex.demo} />
        </div>
      )}

      {ex.guide && ex.guide.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-ink/40">Hướng dẫn từng yêu cầu</div>
          <TabsBlock items={ex.guide} />
        </div>
      )}
      </div>
    </li>
  )
}

/** Một trang hướng dẫn trong bộ slide: một tab (hoặc một phần tab) gồm các khối được chọn, có hệ số thu nhỏ. */
export interface GuidePage {
  tab: number
  blocks: number[]
  zoom: number
  /** Trang tiếp theo của cùng một tab — in thêm chữ "(tiếp)" */
  cont: boolean
}

/** Bố cục bộ slide sau khi đo: mỗi bài có hệ số thu nhỏ cho slide và danh sách trang hướng dẫn. */
export type DeckLayout = Record<string, { slideZoom: number; pages: GuidePage[] }>

/** Chiều cao vùng in của một trang A4 ngang (210mm − 2 × 12mm lề) tính bằng px, trừ một chút cho chắc. */
const PAGE_H = 686
/** Chiều cao dòng chân trang cố định — chừa ra để nội dung không đè lên. */
const FOOTER_H = 22

function defaultPages(ex: Exercise): GuidePage[] {
  return (ex.guide ?? []).map((t, i) => ({ tab: i, blocks: t.blocks.map((_, j) => j), zoom: 1, cont: false }))
}

/**
 * Các trang hướng dẫn in ngay sau slide của bài tập. Mặc định mỗi tab một trang; sau khi
 * đo (fitDeck) thì tab dài được chia thành nhiều trang theo từng khối, trang nào một khối
 * đã vượt trang thì thu nhỏ bằng zoom cho vừa.
 */
function GuideSheet({ ex, pages }: { ex: Exercise; pages?: GuidePage[] }) {
  if (!ex.guide || ex.guide.length === 0) return null
  const list = pages ?? defaultPages(ex)
  return (
    <>
      {list.map((pg, k) => {
        const t = ex.guide![pg.tab]
        return (
          <section key={k} className="print-slide relative" data-guide-tab={pg.tab} style={{ zoom: pg.zoom }}>
            <div className="slide-watermark" aria-hidden>
              <img src="/cybersoft-mark.png" alt="" />
            </div>
            <div className="relative">
              <div data-guide-head className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink/10 pb-2">
                <span className="slide-badge">Hướng dẫn</span>
                <h3 className="text-[18px] font-bold text-ink">
                  <span className="mr-2 font-mono text-[13px] text-brand-400">{pg.tab + 1}.</span>
                  {t.label}
                  {pg.cont && <span className="ml-2 text-[13px] font-normal text-ink/40">(tiếp)</span>}
                </h3>
                {t.hint && <code className="font-mono text-[12px] text-accent-400">{t.hint}</code>}
                <span className="ml-auto text-[12px] text-ink/40">{ex.title}</span>
              </div>
              <div className="text-[13px]">
                {pg.blocks.map((j) => (
                  <div key={j} data-gblock={j} className="mb-3">
                    <BlockView block={t.blocks[j]} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/** Đợi React vẽ xong hai khung hình để đo được kích thước thật. */
function nextFrames(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
}

/**
 * Đo bộ slide đang hiển thị (ở bố cục mặc định, zoom 1) và tính bố cục vừa trang:
 * - slide bài tập: thu nhỏ nếu cao quá một trang;
 * - mỗi tab hướng dẫn: xếp lần lượt từng khối vào trang, đầy thì sang trang mới,
 *   khối nào một mình đã vượt trang thì trang đó thu nhỏ vừa khối.
 */
/** Hệ số thu nhỏ thấp nhất còn đọc được — dưới mức này thì chia thêm trang. */
const MIN_ZOOM = 0.8

/**
 * Chia dãy chiều cao thành n nhóm liên tiếp sao cho nhóm cao nhất là thấp nhất có thể
 * (vét cạn các vị trí cắt — mỗi tab chỉ có vài khối nên rất nhanh).
 */
function balancedSplit(hs: number[], n: number): number[][] {
  const m = hs.length
  if (n >= m) return hs.map((_, i) => [i])
  let best: number[][] = [hs.map((_, i) => i)]
  let bestMax = Infinity
  const cuts: number[] = []
  const rec = (from: number) => {
    if (cuts.length === n - 1) {
      const bounds = [0, ...cuts, m]
      let mx = 0
      for (let g = 0; g < n; g++) {
        let sum = 0
        for (let i = bounds[g]; i < bounds[g + 1]; i++) sum += hs[i]
        mx = Math.max(mx, sum)
      }
      if (mx < bestMax) {
        bestMax = mx
        best = []
        for (let g = 0; g < n; g++) best.push(Array.from({ length: bounds[g + 1] - bounds[g] }, (_, k) => bounds[g] + k))
      }
      return
    }
    for (let c = from; c < m; c++) {
      cuts.push(c)
      rec(c + 1)
      cuts.pop()
    }
  }
  rec(1)
  return best
}

function measureDeck(exs: Exercise[]): DeckLayout {
  const out: DeckLayout = {}
  const limit = PAGE_H - FOOTER_H
  for (const ex of exs) {
    const wrap = document.querySelector<HTMLElement>(`[data-deck-ex="${ex.id}"]`)
    if (!wrap) continue
    const slide = wrap.querySelector<HTMLElement>('[data-deck-slide]')
    const slideZoom = slide ? Math.min(1, limit / Math.max(1, slide.offsetHeight)) : 1
    const pages: GuidePage[] = []
    wrap.querySelectorAll<HTMLElement>('[data-guide-tab]').forEach((sec) => {
      const tab = Number(sec.dataset.guideTab)
      const head = sec.querySelector<HTMLElement>('[data-guide-head]')
      const headH = (head?.offsetHeight ?? 0) + 12
      const ids: number[] = []
      const hs: number[] = []
      sec.querySelectorAll<HTMLElement>('[data-gblock]').forEach((b) => {
        ids.push(Number(b.dataset.gblock))
        hs.push(b.offsetHeight + 12)
      })
      if (hs.length === 0) return
      // Tăng dần số trang cho tới khi trang nào cũng đọc được (zoom ≥ MIN_ZOOM);
      // chia cân bằng để không có trang chỉ còn một khối nhỏ lẻ loi ở cuối tab.
      for (let n = 1; n <= hs.length; n++) {
        const groups = balancedSplit(hs, n)
        const zooms = groups.map((g) => Math.min(1, limit / (headH + g.reduce((t, i) => t + hs[i], 0))))
        const ok = groups.every((g, k) => zooms[k] >= MIN_ZOOM || g.length === 1)
        if (ok || n === hs.length) {
          groups.forEach((g, k) => pages.push({ tab, blocks: g.map((i) => ids[i]), zoom: zooms[k], cont: k > 0 }))
          break
        }
      }
    })
    out[ex.id] = { slideZoom, pages }
  }
  return out
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
  const [picked, setPicked] = useState<Set<string>>(new Set())
  // Bố cục bộ slide sau khi đo — rỗng nghĩa là bố cục mặc định (mỗi tab một trang, zoom 1)
  const [deckLayout, setDeckLayout] = useState<DeckLayout>({})
  // Cho phép kiểm thử tự động gọi bước đo mà không mở hộp thoại in: gửi sự kiện
  // deck:prepare lên document, đo xong trang ghi cờ data-deck-ready lên <html>.
  // (Hook phải đứng trước mọi return sớm.)
  useEffect(() => {
    const onPrepare = () => {
      delete document.documentElement.dataset.deckReady
      void prepareDeck().then(() => {
        document.documentElement.dataset.deckReady = '1'
      })
    }
    document.addEventListener('deck:prepare', onPrepare)
    return () => document.removeEventListener('deck:prepare', onPrepare)
  })

  const levelsCo = LEVELS.filter((lv) => buoi?.exercises.some((e) => e.level === lv))

  useEffect(() => {
    setTab('ly-thuyet')
    setLevel(levelsCo[0] ?? 'Tất cả')
    setPicked(new Set())
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
  const shownExercises = buoi.exercises.filter((e) => level === 'Tất cả' || e.level === level)
  const pickedExercises = buoi.exercises.filter((e) => picked.has(e.id))

  /** Mục lục bấm vào phần lý thuyết thì kéo tab về đúng chỗ trước khi cuộn. */
  function pickToc() {
    setTab('ly-thuyet')
  }

  /**
   * Đặt cờ data-print trên <html> để CSS biết in đầy đủ hay chỉ in tab đang xem,
   * rồi gỡ cờ ra sau khi hộp thoại in đóng lại.
   */
  /**
   * Chuẩn bị bộ slide trước khi in: bật cờ selected để bộ slide hiện ra đúng bề rộng
   * trang in, về bố cục mặc định, đo, rồi áp bố cục vừa trang.
   */
  async function prepareDeck() {
    document.documentElement.dataset.print = 'selected'
    setDeckLayout({})
    await nextFrames()
    const layout = measureDeck(buoi!.exercises.filter((e) => picked.has(e.id)))
    setDeckLayout(layout)
    await nextFrames()
    return layout
  }

  async function printAs(mode: 'full' | 'tab' | 'selected') {
    const root = document.documentElement
    const cleanup = () => {
      delete root.dataset.print
      setDeckLayout({})
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)
    if (mode === 'selected') await prepareDeck()
    else root.dataset.print = mode
    window.print()
    setTimeout(cleanup, 1000)
  }


  /** Bốc ngẫu nhiên một đề 10 bài theo tỷ lệ 2 Cơ bản · 6 Trung bình · 2 Nâng cao. */
  function pickRandomSet() {
    const TY_LE: [string, number][] = [
      ['Cơ bản', 2],
      ['Trung bình', 6],
      ['Nâng cao', 2],
    ]
    const chon = new Set<string>()
    let thieu = 0

    for (const [lv, soLuong] of TY_LE) {
      const kho = buoi!.exercises.filter((e) => e.level === lv)
      // Trộn Fisher–Yates rồi lấy từ đầu
      for (let i = kho.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[kho[i], kho[j]] = [kho[j], kho[i]]
      }
      kho.slice(0, soLuong).forEach((e) => chon.add(e.id))
      thieu += Math.max(0, soLuong - kho.length)
    }

    // Buổi nào thiếu bài ở một mức thì bù bằng bài bất kỳ còn lại, cho đủ 10
    if (thieu > 0) {
      const conLai = buoi!.exercises.filter((e) => !chon.has(e.id))
      for (let i = conLai.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[conLai[i], conLai[j]] = [conLai[j], conLai[i]]
      }
      conLai.slice(0, thieu).forEach((e) => chon.add(e.id))
    }

    setPicked(chon)
    setLevel('Tất cả')
  }

  function togglePick(id: string) {
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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
       <div data-main>
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

            {/* Thanh chọn bài để xuất PDF riêng */}
            <div className="no-print mb-5 flex flex-wrap items-center gap-2.5 rounded-xl border border-ink/10 bg-ink/4 px-3.5 py-2.5">
              <span className="text-[13px] text-ink/55">
                Đã chọn <span className="font-bold text-brand-300">{picked.size}</span> bài
              </span>

              <button
                onClick={() => setPicked(new Set(shownExercises.map((e) => e.id)))}
                className="rounded-lg border border-ink/12 px-2.5 py-1 text-[12.5px] text-ink/60 transition hover:bg-ink/8 hover:text-ink"
              >
                Chọn hết mục đang xem
              </button>

              <button
                onClick={pickRandomSet}
                title="Bốc ngẫu nhiên 2 bài Cơ bản, 6 bài Trung bình, 2 bài Nâng cao"
                className="rounded-lg border border-brand-400/35 bg-brand-500/10 px-2.5 py-1 text-[12.5px] font-semibold text-brand-300 transition hover:bg-brand-500/20"
              >
                Bốc đề 10 bài
                <span className="ml-1.5 font-normal opacity-60">2 · 6 · 2</span>
              </button>

              <button
                onClick={() => setPicked(new Set())}
                disabled={picked.size === 0}
                className="rounded-lg border border-ink/12 px-2.5 py-1 text-[12.5px] text-ink/60 transition hover:bg-ink/8 hover:text-ink disabled:opacity-35"
              >
                Bỏ chọn hết
              </button>

              <button
                onClick={() => printAs('selected')}
                disabled={picked.size === 0}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:brightness-110 disabled:opacity-35 disabled:hover:brightness-100"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
                </svg>
                Xuất slide {picked.size > 0 ? `${picked.size} bài` : 'đã chọn'}
              </button>
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
                      <ExerciseCard
                        key={ex.id}
                        ex={ex}
                        index={i}
                        picked={picked.has(ex.id)}
                        onPick={() => togglePick(ex.id)}
                      />
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
       </div>

        {/* Bộ slide bài tập đã chọn — ẩn trên màn hình, chỉ hiện khi in ở chế độ selected */}
        <div data-print-deck>
          {pickedExercises.map((ex, i) => (
            <div key={ex.id} data-deck-ex={ex.id} className="contents">
              <div data-deck-slide className={i === 0 ? 'deck-first' : undefined} style={{ zoom: deckLayout[ex.id]?.slideZoom ?? 1 }}>
                <ExerciseSlide buoi={buoi} ex={ex} index={i + 1} />
              </div>
              <GuideSheet ex={ex} pages={deckLayout[ex.id]?.pages} />
            </div>
          ))}
        </div>
      </article>

      <OnThisPage items={toc} onPick={pickToc} />
    </div>
  )
}
