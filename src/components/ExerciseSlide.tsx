import type { Buoi, Exercise } from '../data/types'
import Visual from './Visual'

const LEVEL_TONE = {
  'Cơ bản': 'border-mint-400/45 bg-mint-400/12 text-mint-400',
  'Trung bình': 'border-amber-400/50 bg-amber-400/12 text-amber-300',
  'Nâng cao': 'border-rose-400/45 bg-rose-400/12 text-rose-400',
}

export default function ExerciseSlide({ buoi, ex, index }: { buoi: Buoi; ex: Exercise; index: number }) {
  const soViDu = ex.examples?.length ?? 0
  const dense = !!ex.dense && !!ex.visual
  // Bài có lưu đồ soạn riêng thì xếp ví dụ thành nhiều cột cho vừa một trang in;
  // bài lớn (dense) thì ví dụ xếp dọc một cột bên phải hình
  const soCot = dense ? 1 : ex.visual ? (soViDu >= 3 ? 3 : soViDu) : 1

  const figure = ex.visual && (
    <div className="slide-figure mt-3.5 rounded-xl border border-ink/12 px-4 py-4 text-[13px]">
      <Visual v={ex.visual} />
    </div>
  )

  const examples = ex.examples && soViDu > 0 && (
    <div
      className={soCot > 1 ? 'mt-3.5 grid gap-2.5' : 'mt-3.5 space-y-2.5'}
      style={soCot > 1 ? { gridTemplateColumns: `repeat(${soCot}, minmax(0, 1fr))` } : undefined}
    >
      {ex.examples.map((tc, i) => (
        <div key={i} className="rounded-xl border border-ink/12 bg-ink/4 px-3.5 py-2.5">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-ink/40">
            Ví dụ {soViDu > 1 ? i + 1 : ''}
          </div>
          <dl className="space-y-1 font-mono text-[13px]">
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-accent-400">Input:</dt>
              <dd className="whitespace-pre-wrap text-ink/85">{tc.input}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-mint-400">Output:</dt>
              <dd className="whitespace-pre-wrap text-ink/85">{tc.output}</dd>
            </div>
          </dl>
          {tc.explain && (
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/55">
              <span className="font-semibold text-ink/70">Giải thích: </span>
              {tc.explain}
            </p>
          )}
        </div>
      ))}
    </div>
  )

  const constraints = ex.constraints && ex.constraints.length > 0 && (
    <div className="mt-3">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-ink/40">Ràng buộc</div>
      <ul className="flex flex-wrap gap-x-5 gap-y-0.5">
        {ex.constraints.map((c, i) => (
          <li key={i} className="font-mono text-[12.5px] text-ink/55">· {c}</li>
        ))}
      </ul>
    </div>
  )

  const hint = ex.hint && (
      <p className="mt-3 rounded-lg border-l-2 border-amber-400/60 bg-amber-400/8 px-3.5 py-2 text-[13px] text-ink/70">
        <span className="font-semibold text-amber-300">Gợi ý: </span>
        {ex.hint}
      </p>
  )

  return (
    <section className="print-slide relative flex flex-col" data-dense={dense || undefined}>
      {/* Logo chìm — bọc trong khung inset-0 để không làm cao thêm trang in */}
      <div className="slide-watermark" aria-hidden>
        <img src="/cybersoft-mark.png" alt="" />
      </div>

      <div className="relative">
        <div className="mb-2 flex items-center gap-3">
          <span className="slide-badge">Bài {index}</span>
          <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${LEVEL_TONE[ex.level]}`}>
            {ex.level}
          </span>
          <span className="text-[12px] text-ink/35">Buổi {buoi.id}</span>
        </div>

        <h2 className="slide-title">{ex.title}</h2>

        <p className="mt-3 max-w-5xl text-[15.5px] leading-relaxed text-ink/75">{ex.requirement}</p>

        {ex.tasks && ex.tasks.length > 0 && (
          <ol className="slide-tasks mt-2 grid gap-x-6 gap-y-1" style={{ gridTemplateColumns: ex.tasks.length > 4 ? 'repeat(2, minmax(0, 1fr))' : '1fr' }}>
            {ex.tasks.map((t, i) => (
              <li key={i} className="flex gap-2 text-[13.5px] leading-snug text-ink/75">
                <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-brand-500/15 font-mono text-[10.5px] font-bold text-brand-300">
                  {i + 1}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        )}

        {ex.signature && (
          <pre className="mt-2.5 w-fit max-w-full overflow-x-auto rounded-lg border border-ink/12 bg-ink/5 px-3 py-1.5 font-mono text-[13px] text-accent-400">
            {ex.signature}
          </pre>
        )}

        {dense ? (
          <div className="mt-3 grid items-start gap-3" style={{ gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)' }}>
            <div>
              {figure}
              {hint}
            </div>
            <div>
              {examples}
              {constraints}
            </div>
          </div>
        ) : (
          <>
            {figure}
            {examples}
          </>
        )}

        {!dense && constraints}

        {!dense && hint}
      </div>
    </section>
  )
}
