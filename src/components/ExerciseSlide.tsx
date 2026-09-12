import type { Buoi, Exercise } from '../data/types'
import Visual from './Visual'

const LEVEL_TONE = {
  'Cơ bản': 'border-mint-400/45 bg-mint-400/12 text-mint-400',
  'Trung bình': 'border-amber-400/50 bg-amber-400/12 text-amber-300',
  'Nâng cao': 'border-rose-400/45 bg-rose-400/12 text-rose-400',
}

export default function ExerciseSlide({ buoi, ex, index }: { buoi: Buoi; ex: Exercise; index: number }) {
  const soViDu = ex.examples?.length ?? 0
  // Bài có lưu đồ soạn riêng thì xếp ví dụ thành nhiều cột cho vừa một trang in
  const soCot = ex.visual ? (soViDu >= 3 ? 3 : soViDu) : 1

  return (
    <section className="print-slide relative flex flex-col">
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

        {ex.signature && (
          <pre className="mt-2.5 w-fit max-w-full overflow-x-auto rounded-lg border border-ink/12 bg-ink/5 px-3 py-1.5 font-mono text-[13px] text-accent-400">
            {ex.signature}
          </pre>
        )}

        {ex.visual && (
          <div className="slide-figure mt-3.5 rounded-xl border border-ink/12 px-4 py-4 text-[13px]">
            <Visual v={ex.visual} />
          </div>
        )}

        {/* Test case — trình bày đúng như trên web */}
        {ex.examples && soViDu > 0 && (
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
        )}

        {ex.constraints && ex.constraints.length > 0 && (
          <div className="mt-3">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-ink/40">Ràng buộc</div>
            <ul className="flex flex-wrap gap-x-5 gap-y-0.5">
              {ex.constraints.map((c, i) => (
                <li key={i} className="font-mono text-[12.5px] text-ink/55">· {c}</li>
              ))}
            </ul>
          </div>
        )}

        {ex.hint && (
          <p className="mt-3 rounded-lg border-l-2 border-amber-400/60 bg-amber-400/8 px-3.5 py-2 text-[13px] text-ink/70">
            <span className="font-semibold text-amber-300">Gợi ý: </span>
            {ex.hint}
          </p>
        )}
      </div>
    </section>
  )
}
