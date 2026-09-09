import type { Buoi, Exercise, Visual as V } from '../data/types'
import Visual from './Visual'

const LEVEL_TONE = {
  'Cơ bản': 'border-mint-400/45 bg-mint-400/12 text-mint-400',
  'Trung bình': 'border-amber-400/50 bg-amber-400/12 text-amber-300',
  'Nâng cao': 'border-rose-400/45 bg-rose-400/12 text-rose-400',
}

/**
 * Không khai báo visual thì dựng tạm sơ đồ IPO từ chính đề bài,
 * để slide nào cũng có hình chứ không chỉ toàn chữ.
 */
function autoVisual(ex: Exercise): V | undefined {
  if (ex.visual) return ex.visual
  if (!ex.io) return undefined
  return {
    kind: 'ipo',
    input: [ex.io.input],
    process: [ex.hint ?? 'Xử lý theo yêu cầu của đề bài'],
    output: [ex.io.output],
  }
}

export default function ExerciseSlide({ buoi, ex, index }: { buoi: Buoi; ex: Exercise; index: number }) {
  const v = autoVisual(ex)
  // Sơ đồ IPO tự dựng đã hiển thị sẵn input/output nên bỏ hai ô bên dưới cho khỏi lặp
  const showIoBoxes = ex.io && !!ex.visual

  return (
    <section className="print-slide flex flex-col">
      <div className="mb-3 flex items-center gap-2.5 border-b border-ink/12 pb-2.5 text-[11px] font-bold uppercase tracking-[0.16em]">
        <span className="text-brand-400">Buổi {buoi.id} · Bài tập {index}</span>
        <span className="text-ink/30">{buoi.title}</span>
        <span className={`ml-auto rounded-md border px-2 py-0.5 tracking-normal ${LEVEL_TONE[ex.level]}`}>{ex.level}</span>
      </div>

      <h2 className="text-[26px] font-extrabold leading-tight text-ink">{ex.title}</h2>

      <p className="mt-2.5 max-w-4xl text-[15px] leading-relaxed text-ink/70">{ex.requirement}</p>

      {v && (
        <div data-auto={String(!ex.visual)} className="slide-figure mt-4 rounded-xl border border-ink/12 px-4 py-5 text-[13.5px]">
          <Visual v={v} />
        </div>
      )}

      {showIoBoxes && ex.io && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-accent-400/35 bg-accent-400/8 p-3.5">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-400">Input — dữ liệu vào</div>
            <pre className="whitespace-pre-wrap font-mono text-[13px] text-ink/80">{ex.io.input}</pre>
          </div>
          <div className="rounded-xl border border-mint-400/35 bg-mint-400/8 p-3.5">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-mint-400">Output — kết quả mong đợi</div>
            <pre className="whitespace-pre-wrap font-mono text-[13px] text-ink/80">{ex.io.output}</pre>
          </div>
        </div>
      )}

      {ex.hint && (
        <p className="mt-4 rounded-lg border-l-2 border-amber-400/60 bg-amber-400/8 px-3.5 py-2 text-[13.5px] text-ink/70">
          <span className="font-semibold text-amber-300">Gợi ý: </span>
          {ex.hint}
        </p>
      )}
    </section>
  )
}
