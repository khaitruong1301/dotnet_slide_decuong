import { useEffect, useMemo, useRef, useState } from 'react'
import type { CodeSample } from '../data/types'
import { highlight } from './csharp-highlight'

/** Giá trị trông như mảng, ví dụ [1, 2, 3] hoặc ["a", "b"] — tách ra để vẽ thành ô có chỉ số. */
function tachMang(value: string): string[] | null {
  const s = value.trim()
  if (!s.startsWith('[') || !s.endsWith(']')) return null
  const noiDung = s.slice(1, -1).trim()
  if (!noiDung) return []
  if (noiDung.includes('[')) return null
  return noiDung.split(',').map((x) => x.trim())
}

function OMang({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="font-mono text-[12px] text-ink/35">(rỗng)</span>
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((v, i) => (
        <span key={i} className="text-center">
          <span className="block rounded border border-brand-400/35 bg-brand-500/12 px-2 py-0.5 font-mono text-[12px] text-ink/85">
            {v}
          </span>
          <span className="block font-mono text-[9.5px] text-ink/30">{i}</span>
        </span>
      ))}
    </div>
  )
}

export default function CodeRunner({ sample }: { sample: CodeSample }) {
  const trace = sample.trace ?? []
  const dong = useMemo(() => sample.code.split('\n'), [sample.code])
  const [buoc, setBuoc] = useState(0)
  const [dangChay, setDangChay] = useState(false)
  const truocRef = useRef<Record<string, string>>({})

  const hienTai = trace[buoc]
  const vars = hienTai?.vars ?? {}
  const truoc = buoc > 0 ? (trace[buoc - 1].vars ?? {}) : {}

  useEffect(() => {
    truocRef.current = truoc
  }, [buoc, truoc])

  useEffect(() => {
    if (!dangChay) return
    if (buoc >= trace.length - 1) {
      setDangChay(false)
      return
    }
    const t = setTimeout(() => setBuoc((b) => b + 1), 1100)
    return () => clearTimeout(t)
  }, [dangChay, buoc, trace.length])

  if (trace.length === 0) return null

  const tien = () => setBuoc((b) => Math.min(b + 1, trace.length - 1))
  const lui = () => setBuoc((b) => Math.max(b - 1, 0))
  const datLai = () => {
    setBuoc(0)
    setDangChay(false)
  }

  const nut = 'rounded-lg border border-ink/12 px-2.5 py-1.5 text-[12.5px] font-medium text-ink/65 transition hover:bg-ink/8 hover:text-ink disabled:opacity-30'

  return (
    <figure className="overflow-hidden rounded-xl border border-ink/10">
      <figcaption className="flex items-center gap-2 border-b border-ink/10 bg-ink/5 px-4 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint-400/60" />
        </span>
        <span className="ml-1 font-mono text-xs text-ink/45">{sample.title ?? 'csharp'}</span>
        <span className="ml-auto rounded-md bg-brand-500/15 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-brand-300">
          Chạy thử từng dòng
        </span>
      </figcaption>

      <div data-runner className="grid lg:grid-cols-2">
        {/* Cột trái — code, dòng đang chạy được tô sáng */}
        <div className="overflow-x-auto bg-[#0c0c17] py-3">
          <pre className="font-mono text-[12.5px] leading-[1.65]">
            {dong.map((l, i) => {
              const on = hienTai.line === i + 1
              return (
                <div
                  key={i}
                  className={`flex px-3 transition-colors duration-200 ${on ? 'bg-brand-500/25' : ''}`}
                >
                  <span className={`w-7 shrink-0 select-none text-right ${on ? 'text-brand-300' : 'text-white/20'}`}>
                    {i + 1}
                  </span>
                  <span className={`w-3 shrink-0 text-center ${on ? 'text-brand-300' : 'text-transparent'}`}>▸</span>
                  <code className={on ? 'text-white' : 'text-white/70'}>{highlight(l) as React.ReactNode[]}</code>
                </div>
              )
            })}
          </pre>
        </div>

        {/* Cột phải — biến và màn hình console */}
        <div data-runner-state className="space-y-3 border-t border-ink/10 bg-ink/3 p-3.5 lg:border-l lg:border-t-0">
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-ink/35">Biến trong bộ nhớ</div>
            {Object.keys(vars).length === 0 ? (
              <p className="text-[12.5px] text-ink/30">Chưa có biến nào</p>
            ) : (
              <ul className="space-y-1.5">
                {Object.entries(vars).map(([ten, giaTri]) => {
                  const doi = truoc[ten] !== giaTri
                  const mang = tachMang(giaTri)
                  return (
                    <li
                      key={ten}
                      className={`flex items-start gap-2 rounded-lg border px-2.5 py-1.5 transition-colors duration-300 ${
                        doi ? 'border-brand-400/50 bg-brand-500/12' : 'border-ink/10 bg-ink/4'
                      }`}
                    >
                      <span className="shrink-0 font-mono text-[12px] text-brand-300">{ten}</span>
                      <span className="shrink-0 text-ink/25">=</span>
                      {mang ? <OMang items={mang} /> : <span className="font-mono text-[12.5px] text-ink/85">{giaTri}</span>}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-ink/35">Màn hình console</div>
            <div className="min-h-[3.2rem] rounded-lg border border-ink/10 bg-[#0c0c17] px-2.5 py-1.5">
              {(hienTai.output ?? []).length === 0 ? (
                <p className="font-mono text-[12px] text-white/25">(chưa in gì)</p>
              ) : (
                (hienTai.output ?? []).map((d, i) => (
                  <p key={i} className="font-mono text-[12.5px] leading-snug text-mint-400">
                    {d}
                  </p>
                ))
              )}
            </div>
          </div>

          {hienTai.note && (
            <p className="rounded-lg border-l-2 border-accent-400/60 bg-accent-400/8 px-3 py-1.5 text-[12.5px] leading-relaxed text-ink/70">
              {hienTai.note}
            </p>
          )}
        </div>
      </div>

      {/* Thanh điều khiển */}
      <div className="no-print flex flex-wrap items-center gap-2 border-t border-ink/10 bg-ink/5 px-3.5 py-2.5">
        <button onClick={datLai} disabled={buoc === 0 && !dangChay} className={nut} title="Về bước đầu">
          ⏮ Đầu
        </button>
        <button onClick={lui} disabled={buoc === 0} className={nut}>
          ◀ Lùi
        </button>
        <button onClick={tien} disabled={buoc >= trace.length - 1} className={nut}>
          Tiến ▶
        </button>
        <button
          onClick={() => (buoc >= trace.length - 1 ? (setBuoc(0), setDangChay(true)) : setDangChay((v) => !v))}
          className="rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1.5 text-[12.5px] font-semibold text-white transition hover:brightness-110"
        >
          {dangChay ? '❚❚ Dừng' : '▶▶ Tự chạy'}
        </button>

        <span data-step className="ml-auto font-mono text-[11.5px] text-ink/40">
          Bước {buoc + 1}/{trace.length} · dòng {hienTai.line}
        </span>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300"
            style={{ width: `${((buoc + 1) / trace.length) * 100}%` }}
          />
        </div>
      </div>

      {sample.note && (
        <div className="border-t border-ink/10 bg-brand-500/8 px-4 py-2 text-[12.5px] text-brand-300">{sample.note}</div>
      )}
    </figure>
  )
}
