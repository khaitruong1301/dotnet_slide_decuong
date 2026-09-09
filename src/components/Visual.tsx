import type { FlowStep, Visual as V } from '../data/types'

/* ---------------------------------------------------------------- Flow chart */

const NODE_STYLE: Record<FlowStep['kind'], string> = {
  start: 'bg-mint-400/15 border-mint-400/50 text-mint-400 rounded-full',
  end: 'bg-mint-400/15 border-mint-400/50 text-mint-400 rounded-full',
  io: 'bg-accent-400/12 border-accent-400/45 text-accent-400 rounded-lg -skew-x-12',
  process: 'bg-brand-500/14 border-brand-400/45 text-brand-300 rounded-lg',
  decision: 'bg-amber-400/12 border-amber-400/50 text-amber-300',
  note: 'bg-ink/4 border-dashed border-ink/25 text-ink/60 rounded-lg',
}

function Arrow({ h = 30 }: { h?: number }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ height: h }} aria-hidden>
      <div className="w-px flex-1 bg-ink/25" />
      <div className="border-x-4 border-x-transparent border-t-[6px] border-t-ink/35" />
    </div>
  )
}

function FlowNode({ step }: { step: FlowStep }) {
  const isDecision = step.kind === 'decision'
  return (
    <div
      className={`border px-4 py-2.5 text-center text-[0.92em] font-medium leading-snug max-w-[22rem] ${NODE_STYLE[step.kind]}`}
      style={isDecision ? { clipPath: 'polygon(10% 0,90% 0,100% 50%,90% 100%,10% 100%,0 50%)', paddingInline: '2.2rem' } : undefined}
    >
      <span className={step.kind === 'io' ? 'inline-block skew-x-12' : undefined}>{step.text}</span>
    </div>
  )
}

function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <FlowNode step={step} />

          {step.branches && step.branches.length > 0 && (
            <>
              <Arrow h={22} />
              <div className="relative w-full pt-5">
                {/* thanh nối ngang giữa tâm nhánh đầu và nhánh cuối */}
                <div
                  className="absolute top-0 h-px bg-ink/25"
                  style={{ left: `${50 / step.branches.length}%`, right: `${50 / step.branches.length}%` }}
                  aria-hidden
                />
                <div className="flex items-start gap-4">
                  {step.branches.map((b, bi) => (
                    <div key={bi} className="flex-1 flex flex-col items-center">
                      <span className="-mt-8 mb-1 rounded-full border border-ink/15 bg-panel px-2.5 py-0.5 text-[0.66em] font-semibold uppercase tracking-wider text-ink/60">
                        {b.label}
                      </span>
                      <Arrow h={18} />
                      <FlowSteps steps={b.steps} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {i < steps.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------- Khối phụ trợ */

function Caption({ text }: { text?: string }) {
  if (!text) return null
  return <p className="mt-4 text-center text-[0.8em] text-ink/45">{text}</p>
}

function Panel({ title, tone, items }: { title: string; tone: string; items: string[] }) {
  return (
    <div className={`flex-1 rounded-xl border p-4 ${tone}`}>
      <div className="mb-2 text-[0.72em] font-bold uppercase tracking-widest opacity-80">{title}</div>
      <ul className="space-y-1.5 text-[0.86em] leading-snug text-ink/80">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2">
            <span className="opacity-50">•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Chevron() {
  return (
    <div className="hidden shrink-0 self-center text-ink/30 sm:block" aria-hidden>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ Tổng hợp */

export default function Visual({ v }: { v: V }) {
  switch (v.kind) {
    case 'flow':
      return (
        <div className="w-full">
          <FlowSteps steps={v.steps} />
          <Caption text={v.caption} />
        </div>
      )

    case 'ipo':
      return (
        <div className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Panel title="Input — dữ liệu vào" tone="border-accent-400/40 bg-accent-400/8" items={v.input} />
            <Chevron />
            <Panel title="Process — xử lý" tone="border-brand-400/40 bg-brand-500/10" items={v.process} />
            <Chevron />
            <Panel title="Output — kết quả" tone="border-mint-400/40 bg-mint-400/8" items={v.output} />
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'boxes':
      return (
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-4">
            {v.items.map((it, i) => (
              <div key={i} className="text-center">
                <div className="mb-1.5 font-mono text-[0.78em] text-brand-300">{it.label}</div>
                <div className="min-w-[7rem] rounded-lg border border-ink/15 bg-ink/5 px-4 py-3 font-mono text-[0.95em] text-ink">
                  {it.value}
                </div>
                {it.note && <div className="mt-1.5 text-[0.7em] text-ink/45">{it.note}</div>}
              </div>
            ))}
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'strip':
      return (
        <div className="w-full overflow-x-auto">
          <div className="mb-2 text-center font-mono text-[0.8em] text-brand-300">{v.name}</div>
          <div className="flex justify-center">
            <div className="flex">
              {v.items.map((it, i) => {
                const on = v.highlight?.includes(i)
                return (
                  <div key={i} className="text-center">
                    <div
                      className={`flex h-14 min-w-[4.2rem] items-center justify-center border px-3 font-mono text-[0.92em] ${
                        on ? 'border-brand-400 bg-brand-500/25 text-ink' : 'border-ink/15 bg-ink/5 text-ink/85'
                      } ${i === 0 ? 'rounded-l-lg' : ''} ${i === v.items.length - 1 ? 'rounded-r-lg' : 'border-r-0'}`}
                    >
                      {it}
                    </div>
                    <div className="mt-1.5 font-mono text-[0.68em] text-ink/40">[{i}]</div>
                  </div>
                )
              })}
            </div>
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'map':
      return (
        <div className="w-full">
          <div className="mb-3 text-center font-mono text-[0.8em] text-brand-300">{v.name}</div>
          <div className="mx-auto max-w-2xl space-y-2">
            {v.pairs.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2/5 rounded-lg border border-accent-400/40 bg-accent-400/10 px-3 py-2 text-right font-mono text-[0.85em] text-accent-400">
                  {p.key}
                </div>
                <svg width="30" height="14" viewBox="0 0 30 14" className="shrink-0 text-ink/35" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M1 7h24M20 2l6 5-6 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex-1 rounded-lg border border-ink/15 bg-ink/5 px-3 py-2 font-mono text-[0.85em] text-ink/85">{p.value}</div>
              </div>
            ))}
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'loop':
      return (
        <div className="w-full">
          <div className="relative mx-auto max-w-3xl pb-10">
            <div className="flex flex-wrap items-stretch justify-center gap-2 text-[0.84em]">
              {[
                { t: '1. Khởi tạo', v: v.init, c: 'border-accent-400/45 bg-accent-400/10 text-accent-400' },
                { t: '2. Kiểm tra', v: v.cond, c: 'border-amber-400/50 bg-amber-400/10 text-amber-300' },
                { t: '3. Thân lặp', v: v.body, c: 'border-brand-400/45 bg-brand-500/12 text-brand-300' },
                { t: '4. Cập nhật', v: v.step, c: 'border-mint-400/45 bg-mint-400/10 text-mint-400' },
              ].map((b, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`rounded-lg border px-3.5 py-2.5 text-center ${b.c}`}>
                    <div className="text-[0.72em] font-bold uppercase tracking-wider opacity-75">{b.t}</div>
                    <div className="mt-1 font-mono text-ink/90">{b.v}</div>
                  </div>
                  {i < arr.length - 1 && <span className="text-ink/30">→</span>}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-8 rounded-b-xl border-x border-b border-dashed border-ink/25" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 translate-y-1/2 text-center">
              <span className="rounded-full border border-ink/15 bg-panel px-3 py-0.5 text-[0.7em] text-ink/55">
                quay lại bước 2 cho tới khi điều kiện sai
              </span>
            </div>
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'func':
      return (
        <div className="w-full">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="space-y-1.5">
              {v.params.map((p, i) => (
                <div key={i} className="rounded-lg border border-accent-400/40 bg-accent-400/10 px-3 py-1.5 text-center font-mono text-[0.82em] text-accent-400">
                  {p}
                </div>
              ))}
              <div className="text-center text-[0.68em] uppercase tracking-widest text-ink/40">tham số</div>
            </div>
            <Chevron />
            <div className="rounded-xl border border-brand-400/50 bg-brand-500/12 px-5 py-4 text-center">
              <div className="font-mono text-[0.95em] font-semibold text-brand-300">{v.name}</div>
              <div className="mt-1.5 max-w-[16rem] text-[0.8em] leading-snug text-ink/65">{v.body}</div>
            </div>
            <Chevron />
            <div>
              <div className="rounded-lg border border-mint-400/45 bg-mint-400/10 px-3 py-1.5 text-center font-mono text-[0.82em] text-mint-400">
                {v.returns}
              </div>
              <div className="mt-1 text-center text-[0.68em] uppercase tracking-widest text-ink/40">giá trị trả về</div>
            </div>
          </div>
          <Caption text={v.caption} />
        </div>
      )

    case 'timeline':
      return (
        <div className="w-full">
          <ol className="mx-auto max-w-3xl space-y-3">
            {v.items.map((it, i) => (
              <li key={i} className="flex gap-3.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-400/50 bg-brand-500/15 text-[0.75em] font-bold text-brand-300">
                  {i + 1}
                </span>
                <div className="flex-1 rounded-lg border border-ink/10 bg-ink/4 px-3.5 py-2.5">
                  <div className="text-[0.88em] font-semibold text-ink/90">{it.label}</div>
                  <div className="mt-0.5 text-[0.82em] leading-snug text-ink/60">{it.text}</div>
                </div>
              </li>
            ))}
          </ol>
          <Caption text={v.caption} />
        </div>
      )

    case 'compare': {
      const tone = (t?: string) =>
        t === 'good'
          ? 'border-mint-400/40 bg-mint-400/8'
          : t === 'bad'
            ? 'border-rose-400/40 bg-rose-400/8'
            : 'border-ink/12 bg-ink/4'
      return (
        <div className="w-full">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${v.columns.length}, minmax(0,1fr))` }}>
            {v.columns.map((c, i) => (
              <Panel key={i} title={c.title} tone={tone(c.tone)} items={c.items} />
            ))}
          </div>
          <Caption text={v.caption} />
        </div>
      )
    }
  }
}
